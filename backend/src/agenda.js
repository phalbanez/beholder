const nodeSchedule = require('node-schedule');
const beholder = require('./beholder');
const automationsRepository = require('./repositories/automationsRepository');
const logger = require('./utils/logger');

let AGENDA = {};

const LOGS = process.env.AGENDA_LOGS === 'true';

function init(automations) {
    try {
        AGENDA = {};
        automations.map(auto => {
            if (auto.isActive && auto.schedule)
                addSchedule(auto.get ? auto.get({ plain: true }) : auto);
        });
        if (LOGS) logger('system', 'Beholder Agenda has started!');
    } catch (err) {
        throw new Error(`Can't start agenda! Err: ${err.message}`);
    }
}

function verifyCron(schedule) {
    return /^(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})$/.test(schedule);
}

async function runSchedule(id) {
    try {
        let automation = await automationsRepository.getAutomation(id);
        let result = await beholder.evalDecision('', automation.get({ plain: true }));

        if (Array.isArray(result) && result.length)
            result = result.filter(r => r);

        if (!verifyCron(automation.schedule))
            await automationsRepository.updateAutomation(id, { isActive: false });//só executa uma vez

        if (LOGS || automation.logs) logger('A:' + id, `The Scheduled Automation #${id} has fired at ${new Date()}!\n${JSON.stringify(result)}`);
    } catch (err) {
        console.error(err);
    }
}

function addSchedule(automation) {
    if (!automation.schedule) return;
    let job;

    if (verifyCron(automation.schedule)) {
        job = nodeSchedule.scheduleJob(automation.schedule, () => {
            runSchedule(automation.id);
        });
    }
    else {
        const date = Date.parse(automation.schedule);
        job = nodeSchedule.scheduleJob(date, () => {
            runSchedule(automation.id);
        });
    }

    if (!job) throw new Error(`Cant schedule the job. Probably invalid date/cron. schedule: ${automation.schedule}`);

    AGENDA[automation.id] = job;
    if (LOGS || automation.logs) logger('A:' + automation.id, `The Scheduled Automation #${automation.id} (${automation.schedule}) was added to agenda at ${new Date()}!`);
}

function cancelSchedule(id) {
    if (!AGENDA[id]) return;
    AGENDA[id].cancel();
    delete AGENDA[id];
    if (LOGS) logger('A:' + id, `The Schedule Automation #${id} was deleted from agenda at ${new Date()}!`);
}

function getAgenda() {
    return Object.entries(AGENDA).map(props => {
        return {
            id: props[0],
            next: props[1] ? props[1].nextInvocation() : null
        }
    })
}

module.exports = {
    init,
    addSchedule,
    cancelSchedule,
    getAgenda
}
