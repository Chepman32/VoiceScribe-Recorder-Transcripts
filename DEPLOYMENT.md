# Deployment Guide

## iOS Deployment

### Prerequisites
- Valid Apple Developer Account ($99/year)
- Xcode 14+ installed
- Provisioning profiles and certificates configured

### 1. Configure App Identifiers

1. Open `ios/VoiceScribe.xcworkspace` in Xcode
2. Select project > Signing & Capabilities
3. Set Bundle Identifier: `com.yourcompany.voicescribe`
4. Select your Team
5. Enable capabilities:
   - Microphone usage
   - Background modes (Audio)
   - In-App Purchase

### 2. Update Info.plist

Add required privacy descriptions:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>VoiceScribe needs microphone access to record audio</string>
<key>NSUserNotificationsUsageDescription</key>
<string>VoiceScribe uses notifications to alert you when recordings are complete</string>
```

### 3. Build for Release

```bash
cd ios
xcodebuild -workspace VoiceScribe.xcworkspace \
           -scheme VoiceScribe \
           -configuration Release \
           -archivePath ./build/VoiceScribe.xcarchive \
           archive

xcodebuild -exportArchive \
           -archivePath ./build/VoiceScribe.xcarchive \
           -exportPath ./build \
           -exportOptionsPlist ExportOptions.plist
```

### 4. Upload to App Store

Use Xcode or Transporter app:
1. Open Transporter
2. Sign in with Apple ID
3. Select `.ipa` file from `ios/build/`
4. Upload to App Store Connect

### 5. App Store Metadata

Required assets:
- App Icon: 1024x1024px
- Screenshots: 6.5", 5.5" iPhone sizes
- App Preview video (optional)

App Store Information:
- Name: VoiceScribe
- Subtitle: Offline Voice Recorder
- Description: [See STORE_COPY.md]
- Keywords: voice recorder, transcription, offline, notes
- Category: Productivity
- Age Rating: 4+

## Android Deployment

### Prerequisites
- Google Play Developer Account ($25 one-time)
- Android Studio installed
- Keystore for signing

### 1. Generate Release Keystore

```bash
cd android/app
keytool -genkey -v -keystore release.keystore \
        -alias voicescribe \
        -keyalg RSA -keysize 2048 \
        -validity 10000

# Move keystore to secure location
mv release.keystore ~/.android/keystores/
```

### 2. Configure Signing

Edit `android/gradle.properties`:

```properties
VOICESCRIBE_RELEASE_STORE_FILE=~/.android/keystores/release.keystore
VOICESCRIBE_RELEASE_KEY_ALIAS=voicescribe
VOICESCRIBE_RELEASE_STORE_PASSWORD=***
VOICESCRIBE_RELEASE_KEY_PASSWORD=***
```

### 3. Build Release APK/AAB

```bash
cd android

# For APK
./gradlew assembleRelease

# For AAB (recommended for Play Store)
./gradlew bundleRelease
```

Output:
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Upload AAB to Internal Testing track
4. Complete store listing:
   - Title: VoiceScribe
   - Short description: Offline voice recorder with transcription
   - Full description: [See STORE_COPY.md]
   - Screenshots: 5-8 screenshots
   - Feature graphic: 1024x500px
   - App icon: 512x512px

5. Set pricing & distribution
6. Submit for review

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: cd ios && pod install
      - run: npm run build:ios

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - run: npm install
      - run: npm run build:android
```

### Fastlane

Install Fastlane:
```bash
sudo gem install fastlane -NV
```

#### iOS Fastlane

Create `ios/fastlane/Fastfile`:

```ruby
default_platform(:ios)

platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    increment_build_number(xcodeproj: "VoiceScribe.xcodeproj")
    build_app(scheme: "VoiceScribe")
    upload_to_testflight
  end

  desc "Submit to App Store"
  lane :release do
    build_app(scheme: "VoiceScribe")
    upload_to_app_store
  end
end
```

Run: `fastlane ios beta`

#### Android Fastlane

Create `android/fastlane/Fastfile`:

```ruby
default_platform(:android)

platform :android do
  desc "Build and upload to Play Store Internal Testing"
  lane :beta do
    gradle(task: "clean bundleRelease")
    upload_to_play_store(
      track: 'internal',
      aab: 'app/build/outputs/bundle/release/app-release.aab'
    )
  end

  desc "Deploy to Play Store Production"
  lane :release do
    gradle(task: "clean bundleRelease")
    upload_to_play_store(
      track: 'production',
      aab: 'app/build/outputs/bundle/release/app-release.aab'
    )
  end
end
```

Run: `fastlane android beta`

## Version Management

### Semantic Versioning

Follow [semver](https://semver.org/):
- MAJOR.MINOR.PATCH (e.g., 1.0.0)
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Update Version

iOS (`ios/VoiceScribe/Info.plist`):
```xml
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

Android (`android/app/build.gradle`):
```gradle
defaultConfig {
    versionCode 1
    versionName "1.0.0"
}
```

### Automated Version Bumping

Install version management tool:
```bash
npm install -g standard-version
```

Bump version:
```bash
standard-version
git push --follow-tags origin main
```

## Release Checklist

### Pre-Release
- [ ] All tests passing
- [ ] No console warnings in production build
- [ ] Performance profiling complete
- [ ] Accessibility audit passed
- [ ] Privacy policy updated
- [ ] Terms of service reviewed
- [ ] App Store metadata prepared
- [ ] Screenshots and videos ready
- [ ] Release notes written

### iOS Release
- [ ] Code signing certificates valid
- [ ] Provisioning profiles updated
- [ ] Build number incremented
- [ ] Archive built successfully
- [ ] TestFlight beta tested
- [ ] App Store review submission
- [ ] Phased release configured

### Android Release
- [ ] Keystore backed up
- [ ] Build signed with release key
- [ ] ProGuard rules tested
- [ ] AAB uploaded to Internal Testing
- [ ] Internal testing complete
- [ ] Play Store listing complete
- [ ] Rollout percentage set

### Post-Release
- [ ] Monitor crash reports
- [ ] Check user reviews
- [ ] Track analytics
- [ ] Prepare hotfix process
- [ ] Plan next version
- [ ] Update documentation
- [ ] Celebrate! 🎉

## Rollback Procedure

### iOS
1. Go to App Store Connect
2. Select the app
3. Go to "App Store" tab
4. Remove the problematic version
5. Re-submit previous stable version

### Android
1. Go to Google Play Console
2. Select "Release" > "Production"
3. Create new release with previous AAB
4. Set to 100% rollout
5. Previous version will be restored

## Monitoring

### Analytics
- Firebase Analytics (optional, requires setup)
- Sentry for error tracking
- Custom analytics in app

### Crash Reporting
```bash
npm install @sentry/react-native
```

Configure in `App.tsx`:
```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: __DEV__ ? 'development' : 'production',
});
```

### Performance Monitoring
- React Native Performance monitor
- Flipper for debugging
- Xcode Instruments (iOS)
- Android Profiler

## Support

### User Feedback
- In-app feedback form
- App Store/Play Store reviews
- Email support: support@voicescribe.app
- GitHub Issues for bugs

### Documentation
- [User Guide](./docs/USER_GUIDE.md)
- [FAQ](./docs/FAQ.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

For questions about deployment, please refer to the React Native documentation or open an issue.
