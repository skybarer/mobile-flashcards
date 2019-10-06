import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'FlashCards:notifications';

// Somewhat hacky function to generate unique ID for each Deck.
// Warning: Wouldn't be suitable for use in a production application.
export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const createNotification = () => ({
    title: "Don't forget to practice",
    body: 'Your flash cards want to see you today.',
    ios: {
        sound: false
    },
    android: {
        sound: false,
        vibrate: false,
        priority: 'high',
        sticky: false
    }
});

export const clearLocalNotification = () => {
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
};

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();
                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(12);
                    tomorrow.setMinutes(30);

                    Notifications.scheduleLocalNotificationAsync(createNotification(), {
                        time: tomorrow,
                        repeat: 'day'
                    });

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                }
            });
        }
    });
};
