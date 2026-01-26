# 📋 Play Store Release Quick Checklist

## Pre-Build Requirements

- [ ] **Generate release keystore** (see RELEASE_KEYSTORE_SETUP.md)
  ```bash
  cd android/app
  keytool -genkeypair -v -storetype PKCS12 -keystore wobbly-runner-release.keystore -alias wobbly-runner -keyalg RSA -keysize 2048 -validity 10000
  ```

- [ ] **Add keystore credentials** to `android/gradle.properties`
  ```properties
  WOBBLY_RUNNER_UPLOAD_STORE_FILE=wobbly-runner-release.keystore
  WOBBLY_RUNNER_UPLOAD_KEY_ALIAS=wobbly-runner
  WOBBLY_RUNNER_UPLOAD_STORE_PASSWORD=your_password_here
  WOBBLY_RUNNER_UPLOAD_KEY_PASSWORD=your_password_here
  ```

- [ ] **Backup keystore file** to secure location (critical!)

## Build Release

- [ ] **Clean previous builds**
  ```bash
  cd android && ./gradlew clean
  ```

- [ ] **Build release AAB** (for Play Store)
  ```bash
  ./gradlew bundleRelease
  ```
  Output: `android/app/build/outputs/bundle/release/app-release.aab`

- [ ] **Or build APK** (for testing)
  ```bash
  ./gradlew assembleRelease
  ```
  Output: `android/app/build/outputs/apk/release/app-release.apk`

## Test Release Build

- [ ] Install on real device: `adb install path/to/app-release.apk`
- [ ] App launches without crashes
- [ ] Real AdMob ads display (not test ads)
- [ ] All game features work
- [ ] Sound and music play correctly
- [ ] Store purchases work
- [ ] Achievements unlock properly
- [ ] Legal pages load correctly
- [ ] Certificate sharing works

## Prepare Store Assets

- [ ] **App Icon** (512x512 PNG) - use assets/images/icon.png (resize)
- [ ] **Feature Graphic** (1024x500 JPEG/PNG) - create this!
- [ ] **Screenshots** (at least 2):
  - Main menu
  - Gameplay
  - Achievements
  - Store screen

## Host Privacy Policy

- [ ] Upload `docs/privacy-policy.html` to web host
- [ ] Get public URL
- [ ] Test URL accessibility
- [ ] Options:
  - GitHub Pages (free)
  - Firebase Hosting (free)
  - Netlify Drop (free)

## Play Console Setup

- [ ] Create app in Google Play Console
- [ ] Upload AAB file
- [ ] Add app icon (512x512)
- [ ] Add feature graphic (1024x500)
- [ ] Upload screenshots (minimum 2)
- [ ] Write short description (max 80 chars)
- [ ] Write full description
- [ ] Select category: Games > Arcade
- [ ] Add tags: runner, endless runner, arcade
- [ ] Complete content rating questionnaire
- [ ] Add privacy policy URL
- [ ] Complete data safety form
- [ ] Set pricing: Free
- [ ] Select countries for distribution
- [ ] Add store listing in all required languages

## Pre-Submission Review

- [ ] All required fields filled
- [ ] Privacy policy URL working
- [ ] Screenshots look good
- [ ] Description is accurate
- [ ] Content rating appropriate
- [ ] Release tested on real device
- [ ] No crashes or critical bugs
- [ ] AdMob ads working

## Submit for Review

- [ ] Select release track (Internal Test → Production)
- [ ] Submit for review
- [ ] Wait for approval (typically 1-7 days)

## Post-Submission

- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Track analytics
- [ ] Plan future updates

---

## 🚨 Critical Reminders

⚠️ **BACKUP YOUR KEYSTORE** - You cannot update your app without it!

⚠️ **NEVER commit keystore or passwords to Git**

⚠️ **Test release build thoroughly** before submission

⚠️ **Privacy policy must be publicly accessible**

---

## Version Numbers

**Current Version:**
- Version Name: 1.0.0
- Version Code: 1

**Next Update:**
- Increment versionCode to 2
- Update versionName (1.0.1, 1.1.0, or 2.0.0)
- Update in BOTH app.json AND android/app/build.gradle

---

✅ **Ready to Release!** Follow this checklist step by step.
