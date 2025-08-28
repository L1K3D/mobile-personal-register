# Mobile Personal Register

## Overview

Mobile Personal Register is a lightweight, cross-platform React Native application designed to demonstrate robust client-side data collection, validation, and local persistence on mobile devices. The project emphasizes input validation, a polished user experience, and dependable local storage using established community libraries. The codebase is intentionally compact so it can serve both as an instructional reference and as a practical starting point for production features.

The repository contains an Expo-compatible React Native application implementing a user registration form with comprehensive validation rules, a modern visual theme, and persistence through device-local storage. The implementation focuses on correctness, maintainability, and being easy to extend.

## Key Features

- Modern, card-based user interface with an elegant dark theme.
- Client-side validation for all critical input fields (personal code, full name, email, password, confirmation).
- Local persistence using AsyncStorage for quick save/load of form data.
- Clear separation of concerns: UI, styles, and persistence logic are modular.

## Validation Rules

Before data is saved, the application enforces the following constraints:

- Personal code must be a numeric value strictly greater than 0.
- Full name is required and cannot be empty or whitespace-only.
- Email must match a reasonable regular expression for syntactic validity.
- Password and confirmation must be identical.
- Password must contain at least one numeric digit.
- Password must contain at least one uppercase letter.
- Password must have a minimum length of five characters.

These rules provide immediate client-side feedback and prevent storing invalid entries locally.

## Technology Stack

- React Native (Expo) — cross-platform UI and runtime.
- JavaScript (ES2020+) — application logic.
- @react-native-async-storage/async-storage — for device-local persistence.
- Built-in React Native components and StyleSheet for layout and styling.

## Project Structure

- `App.js` — application entry point; defines form state, validation logic, and persistence operations.
- `styles.js` — centralized style definitions implementing a modern theme.
- `package.json` — dependencies and scripts.
- `assets/` — static images and icons used by the app.

This separation keeps the project maintainable and makes it straightforward to replace or augment any single area (for example, swapping AsyncStorage for a remote API or adopting a different visual system).

## Installation

Prerequisites: Node.js (LTS), npm or Yarn, and the Expo CLI if you plan to run via Expo.

1. Clone the repository:

```bash
git clone <repository-url>
cd mobile-personal-register
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Ensure AsyncStorage is installed (this package may already be present after install):

```bash
npm install @react-native-async-storage/async-storage
# or
yarn add @react-native-async-storage/async-storage
```

4. Start the development server (Expo):

```bash
npm start
# or
expo start
```

Open the app in a simulator/emulator or a physical device using Expo Go, following the on-screen instructions.

## Usage

1. Launch the app.
2. Fill in the fields: Code, Name, Email, Password, and Confirm Password.
3. Tap "Save" to persist the data locally. If validation fails, an alert will indicate the first failed rule.
4. Tap "Load" to restore persisted data into the form fields.
5. Use "Clear" to reset all fields.

## Testing and Quality Gates

Although this repository does not currently include an automated test suite, recommended steps to improve quality are:

- Add ESLint and a shared lint configuration to enforce consistent styling and catch common mistakes.
- Extract validation logic into a pure module and add Jest unit tests to cover expected and edge-case inputs.
- Manual smoke tests on Android and iOS emulators to verify UI layout, keyboard handling, and persistence behavior.

## Security and Privacy Considerations

- This application stores data (including passwords) in plain AsyncStorage for demonstration purposes. For production use, adopt secure storage (encrypted storage or Keychain/Keystore) and ensure sensitive data is not persisted in plaintext.
- Client-side validation reduces malformed data but should be complemented by server-side validation and proper authorization if data is transmitted or synchronized.

## Extensibility and Next Steps

Suggested improvements for production readiness:

- Integrate a secure backend service (HTTPS) and implement proper authentication and session management.
- Replace plain AsyncStorage for sensitive fields with encrypted secure storage.
- Provide inline, per-field validation error messages instead of alert dialogs, and add accessibility labels for screen readers.
- Introduce a component-driven UI library (e.g., React Native Paper or styled-components) for systematic theming.
- Add continuous integration (CI) with linting, unit tests, and end-to-end tests.

## Contribution

Contributions are welcome. Please open issues for bugs and feature requests. For code changes, submit pull requests with clear, focused changes and explanations.

## License

This project is offered under the MIT License unless an alternative license is provided in a LICENSE file.

---