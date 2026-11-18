# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:
```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:
- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.
- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

-----------------------------------------------------------------------------------------------------------------------

# TasksHub - Mobile Application Development (Practical 07)

This project is a React Native / Expo mobile application developed as part of **Persistent Storage & Local Notifications**

## 🚀 Features & Implementation Details

1. **Hybrid File-Based Routing (Tabs + Stack):**
   - Implemented using Expo Router.
   - Combines bottom tab navigation (Dashboard and Profile tabs) with stack navigation (`add-task` modal screen).

2. **Persistent Storage (AsyncStorage):**
   - Stores, retrieves, and clears stringified object arrays locally.
   - Used to persist task lists and student profile information (`studentProfile`) locally on the device even after restarting the app.

3. **Local Notifications (`expo-notifications`):**
   - Triggers immediate local device notifications when a task is successfully created and saved.

4. **Image Picker (`expo-image-picker`):**
   - Integrates device media library access to select, crop, and display profile avatar images.

## 📂 Project Structure

src/app/
├── _layout.tsx         # Root layout and notification configuration
├── index.tsx           # Entry point redirecting to tabs
├── add-task.tsx        # Add task screen (AsyncStorage & local notifications)
└── (tabs)/
    ├── _layout.tsx     # Bottom tab bar configuration with vector icons
    ├── index.tsx       # Dashboard screen (reads and displays tasks using useFocusEffect)
    └── profile.tsx     # Profile screen (AsyncStorage profile management & image picker)