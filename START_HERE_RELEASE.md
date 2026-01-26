# 🚀 Quick Start - Release Your App NOW

## ⚡ 5-Minute Quick Start Guide

Follow these steps in order to release your app to the Play Store.

---

## Step 1: Generate Keystore (5 minutes)

Open terminal in project root and run:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore wobbly-runner-release.keystore -alias wobbly-runner -keyalg RSA -keysize 2048 -validity 10000
```

**Enter the information when prompted. SAVE YOUR PASSWORDS!**

---

## Step 2: Configure Credentials (2 minutes)

Open or create `android/gradle.properties` and add:

```properties
WOBBLY_RUNNER_UPLOAD_STORE_FILE=wobbly-runner-release.keystore
WOBBLY_RUNNER_UPLOAD_KEY_ALIAS=wobbly-runner
WOBBLY_RUNNER_UPLOAD_STORE_PASSWORD=PUT_YOUR_PASSWORD_HERE
WOBBLY_RUNNER_UPLOAD_KEY_PASSWORD=PUT_YOUR_PASSWORD_HERE
```

**Replace `PUT_YOUR_PASSWORD_HERE` with your actual passwords!**

---

## Step 3: Build Release (5 minutes)

### Windows:
```cmd
build-release.bat
```

### Linux/Mac:
```bash
chmod +x build-release.sh
./build-release.sh
```

**Choose option 1 (AAB for Play Store)**

---

## Step 4: Test Release (15 minutes)

Install APK on your device and test:

```bash
cd android
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk
```

**Test everything works: gameplay, ads, sound, store, achievements**

---

## Step 5: Create Store Assets (30 minutes)

### Required Assets:

1. **App Icon** (512x512)
   - Resize `assets/images/icon.png` to 512x512
   - Use any image editor

2. **Feature Graphic** (1024x500)
   - Create promotional image
   - Use Canva, Photoshop, or GIMP

3. **Screenshots** (minimum 2)
   - Take screenshots from your app
   - Main menu, gameplay, achievements, store

---

## Step 6: Host Privacy Policy (10 minutes)

### Quick Option - GitHub Pages:

1. Create new GitHub repo
2. Upload `docs/` folder
3. Enable GitHub Pages in Settings
4. Note the URL: `https://yourusername.github.io/reponame/privacy-policy.html`

### Even Quicker - Netlify Drop:

1. Go to https://app.netlify.com/drop
2. Drag and drop `docs/` folder
3. Get instant URL

---

## Step 7: Play Console Setup (30 minutes)

1. Go to https://play.google.com/console
2. Click "Create App"
3. Fill in:
   - App name: **Wobbly Runner**
   - Default language: English
   - App or game: **Game**
   - Free or paid: **Free**

4. Upload AAB:
   - Go to Release → Production
   - Upload `android/app/build/outputs/bundle/release/app-release.aab`

5. Fill Store Listing:
   - Short description: `Master the wobbly physics! Run, collect coins, and unlock achievements!`
   - Full description: (see PLAY_STORE_RELEASE_GUIDE.md)
   - App icon: Upload 512x512 icon
   - Feature graphic: Upload 1024x500 graphic
   - Screenshots: Upload at least 2

6. Content Rating:
   - Complete questionnaire
   - Select "Everyone"

7. Privacy Policy:
   - Add your hosted URL

8. Data Safety:
   - No data collected
   - Data encrypted in transit

9. Set Pricing & Distribution:
   - Free
   - Select all countries

10. Submit for Review!

---

## ✅ You're Done!

**Review time:** 1-7 days

---

## 🆘 Need Help?

**Read the detailed guides:**
- [PLAY_STORE_RELEASE_GUIDE.md](PLAY_STORE_RELEASE_GUIDE.md) - Complete guide
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) - Detailed checklist
- [PRODUCTION_RELEASE_SUMMARY.md](PRODUCTION_RELEASE_SUMMARY.md) - What was changed

**Common Issues:**

**Q: Build fails with "signing config not found"**  
A: Make sure you added credentials to `android/gradle.properties`

**Q: Ads not showing in release**  
A: Already fixed! Production AdMob IDs are configured

**Q: App crashes on release build**  
A: Already fixed! ProGuard rules are comprehensive

**Q: Play Store rejects my app**  
A: Check privacy policy URL is accessible and all required assets are uploaded

---

## 🎯 Timeline

- Keystore generation: **5 minutes**
- Configure credentials: **2 minutes**
- Build release: **5 minutes**
- Test release: **15 minutes**
- Create assets: **30 minutes**
- Host privacy policy: **10 minutes**
- Play Console setup: **30 minutes**

**Total: ~1.5 hours to submission!**

**Then wait 1-7 days for Google's review**

---

## 🎉 Ready to Launch!

All the hard technical work is done. Just follow these steps and you'll be live on the Play Store!

**Good luck! 🚀**
