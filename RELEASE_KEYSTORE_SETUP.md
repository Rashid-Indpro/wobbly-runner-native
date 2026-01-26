# 🔐 Release Keystore Setup Guide

## ⚠️ CRITICAL: Generate Production Keystore

Your app currently uses a **DEBUG keystore** for release builds. You **MUST** generate a production keystore before releasing to Play Store.

## 📝 Step-by-Step Instructions

### 1. Generate Release Keystore

Run this command in your terminal (from the project root):

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore wobbly-runner-release.keystore -alias wobbly-runner -keyalg RSA -keysize 2048 -validity 10000
```

### 2. When Prompted, Enter:

- **Keystore password**: Choose a strong password (save it securely!)
- **Key password**: Same or different password (save it securely!)
- **First and last name**: Your name or company name
- **Organizational unit**: Your team/department (or press Enter)
- **Organization**: Your company name (or press Enter)
- **City/Locality**: Your city
- **State/Province**: Your state
- **Country code**: Your 2-letter country code (e.g., US, IN, UK)

### 3. Verify Keystore Created

Check that `android/app/wobbly-runner-release.keystore` file exists.

### 4. Update Gradle Configuration

Create `android/gradle.properties` file (or add to existing) with:

```properties
WOBBLY_RUNNER_UPLOAD_STORE_FILE=wobbly-runner-release.keystore
WOBBLY_RUNNER_UPLOAD_KEY_ALIAS=wobbly-runner
WOBBLY_RUNNER_UPLOAD_STORE_PASSWORD=YOUR_KEYSTORE_PASSWORD
WOBBLY_RUNNER_UPLOAD_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

**⚠️ IMPORTANT**: Replace `YOUR_KEYSTORE_PASSWORD` and `YOUR_KEY_PASSWORD` with actual passwords!

### 5. Update build.gradle Signing Config

The signing configuration in `android/app/build.gradle` will automatically use these credentials.

## 🔒 Security Best Practices

1. **NEVER** commit keystore files to Git
2. **NEVER** commit passwords to Git  
3. **BACKUP** your keystore file securely (cloud storage, password manager)
4. **SAVE** all passwords in a secure password manager
5. Add to `.gitignore`:
   ```
   *.keystore
   *.jks
   ```

## 🆘 If You Lose Your Keystore

**YOU CANNOT UPDATE YOUR APP ON PLAY STORE!**

You would need to:
- Publish a completely new app with a new package name
- Lose all existing users, ratings, and reviews

**BACKUP YOUR KEYSTORE NOW!**

---

After completing these steps, you can proceed with building the release APK/AAB.
