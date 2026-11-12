import * as Notifications from "expo-notifications";
import {Stack} from 'expo-router';

// ensure notifications show up when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async() => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <Stack></Stack>
    // in here, handle the stack navigation for the "Add task UI & tabs, Group"
);
}
