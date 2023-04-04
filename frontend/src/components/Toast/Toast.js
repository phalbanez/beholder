import React, { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';

/**
 * props:
 * - text
 * - type
 */
function Toast(props) {

    const DEFAULT_NOTIFICATION = { type: '', text: '' };

    const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

    useEffect(() => {
        if (!notification.text) return;

        const notyf = new window.Notyf({
            position: {
                x: 'right',
                y: 'top',
            },
            duration: 0,
            types: [
                {
                    type: 'info',
                    background: 'blue',
                    dismissible: true
                },
                {
                    type: 'error',
                    background: 'red',
                    dismissible: true
                },
                {
                    type: 'success',
                    background: 'green',
                    dismissible: true
                }
            ]
        });

        notyf.open({
            type: notification.type,
            message: notification.text
        })
            .on('dismiss', ({ target, event }) => {
                setNotification(DEFAULT_NOTIFICATION);
            });
        //setNotification(DEFAULT_NOTIFICATION);
    }, [notification])

    useEffect(() => {
        setNotification({ type: props.type, text: props.text });
    }, [props.type, props.text])

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => {
            console.log(`Connected to App WS`);
        },
        onMessage: () => {
            if (lastJsonMessage && lastJsonMessage.notification) {
                setNotification(lastJsonMessage.notification);
            }
        },
        queryParams: { 'token': localStorage.getItem("token") },
        onError: (event) => {
            console.error(event);
            setNotification({ text: JSON.stringify(event), type: 'error' });
        },
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000
    });

    return (
        <React.Fragment></React.Fragment>
    )
}

export default Toast;