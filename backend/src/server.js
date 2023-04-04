const database = require('./db');
const app = require('./app');
const settingsRepository = require('./repositories/settingsRepository');
const automationsRepository = require('./repositories/automationsRepository');
const appEm = require('./app-em');
const appWs = require('./app-ws');
const beholder = require('./beholder');
const agenda = require('./agenda');
const logger = require('./utils/logger');

(async () => {
    // const version = process.version.replace('v', '').split('.')[0];
    // if (parseInt(version) < 14) {
    //     console.log(`Your Node.js version is ${process.version}. Beholder is compatible with Node 14+.`);
    //     process.exit(0);
    // }

    logger('system', `Getting the default settings with ID ${process.env.DEFAULT_SETTINGS_ID}...`);
    const settings = await settingsRepository.getDefaultSettings()
    if (!settings) throw new Error(`There is no settings.`);

    logger('system', 'Initializing the Beholder Brain...');

    const automations = await automationsRepository.getActiveAutomations();
    beholder.init(automations);

    logger('system', `Starting the Beholder Agenda...`);
    agenda.init(automations);

    logger('system', `Starting the server apps...`);
    const server = app.listen(process.env.PORT, () => {
        logger('system', 'App is running at ' + process.env.PORT);
    })

    const wss = appWs(server);

    appEm.init(settings, wss, beholder);

})();