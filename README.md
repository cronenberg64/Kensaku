# Kensaku (検索) - Japanese Academic Research Collaboration Platform

Kensaku is a mobile and web platform designed to enhance research paper output among university students and faculty in Japan. The platform addresses key challenges in academic research by providing tools for topic discovery, collaboration, and publishing guidance.

## Features

### Core Features (MVP)
- **Topic Suggestion System**: AI-powered recommendations for trending research topics and areas
- **Collaboration Hub**: Connect students with professors and other researchers
- **Publishing Support**: Templates, checklists, and journal recommendations

### Target Users
- Undergraduate Students
- Graduate Students
- Professors
- Academic Instructors

## Tech Stack

- **Frontend**: React Native (Mobile & Web)
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Functions
- **Future Backend**: Python/Java (for advanced features)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Firebase CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd kensaku
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up Firebase:
- Create a new Firebase project
- Enable Authentication and Firestore
- Add your Firebase configuration to `src/config/firebase.js`

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on your preferred platform:
```bash
# For iOS
npm run ios
# For Android
npm run android
# For Web
npm run web
```

## Project Structure

```
kensaku/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── services/       # API and Firebase services
│   ├── utils/          # Helper functions
│   ├── config/         # Configuration files
│   └── assets/         # Images, fonts, etc.
├── android/           # Android specific files
├── ios/              # iOS specific files
└── web/              # Web specific files
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ministry of Education, Culture, Sports, Science and Technology (MEXT)
- Japanese Academic Community 