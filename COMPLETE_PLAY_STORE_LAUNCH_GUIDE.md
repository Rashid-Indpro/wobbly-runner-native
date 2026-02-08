# Complete Google Play Store Launch Guide
## Step-by-Step: From Draft to Production

**Current Status:** Version 5 (1.0.5) Draft created in Internal Testing
**Goal:** Successfully launch Wobbly Runner on Google Play Store

---

## PHASE 1: COMPLETE INTERNAL TESTING RELEASE

### Step 1: Upload AAB File to Draft Release

1. **Navigate to Internal Testing**
   - Go to: Testing → Internal testing
   - Click on the **"5 (1.0.5)"** Draft release
   - Click **"Edit release"** button

2. **Upload AAB File**
   - In the "App bundles" section, click **"Upload"**
   - Select file: `android\app\build\outputs\bundle\release\app-release.aab`
   - Wait for upload to complete (file will be analyzed by Google)
   - You'll see: "app-release.aab uploaded successfully"
   - Version code 5 and version name 1.0.5 will be detected automatically

3. **Fill Release Details**
   - **Release name:** `1.0.5 - Audio Optimization Update`
   - **Release notes (English - United States):**
     ```
     🎵 Audio Experience Enhanced:
     • Optimized music volume levels for better balance
     • Dual music system: Separate menu and gameplay music
     • Individual toggles for gameplay music, menu music, and sound effects
     • Fine-tuned sound effect volumes
     • Smooth music transitions between menus and gameplay
     
     🎮 Gameplay Improvements:
     • Enhanced first-time gameplay guide with better visibility
     • Color-coded obstacles and collectibles
     • Improved tutorial experience
     
     🐛 Bug Fixes:
     • Fixed background music not playing in production
     • Improved audio loading system
     • General stability improvements
     ```

4. **Review and Save**
   - Scroll down, click **"Save"**
   - Click **"Review release"**
   - Review all details
   - Click **"Start rollout to Internal testing"**
   - Confirm by clicking **"Rollout"**

---

### Step 2: Add Internal Testers

1. **Create Tester Email List**
   - In Internal testing page, go to **"Testers"** tab
   - Click **"Create email list"**
   - **List name:** `Wobbly Runner Internal Testers`
   - Add email addresses (one per line):
     - Your email address
     - Team member emails
     - Any trusted testers (up to 100)
   - Click **"Save"**

2. **Enable the Tester List**
   - After creating, the list will appear
   - Make sure it's **selected/enabled**
   - Copy the **"Opt-in URL"** link (you'll need to share this with testers)

3. **Share with Testers**
   - Send the opt-in URL to all testers
   - They must:
     1. Click the opt-in URL
     2. Accept the invitation
     3. Download the app from Play Store (will show as internal testing)

4. **Wait for Processing**
   - Google will process the AAB (usually 30 minutes - 2 hours)
   - Testers can download once status shows "Available to testers"

---

## PHASE 2: COMPLETE APP CONTENT (MANDATORY)

### Step 3: Complete Store Listing

1. **Go to Store presence → Main store listing**

2. **App Details**
   - **App name:** `Wobbly Runner`
   - **Short description (80 chars max):**
     ```
     Dodge obstacles, collect coins, and master the wobble in this endless runner!
     ```
   - **Full description (4000 chars max):**
     ```
     🏃 Welcome to Wobbly Runner - The Ultimate Endless Running Adventure! 🏃
     
     Get ready for a thrilling endless runner experience where every move matters! Navigate through challenging lanes, dodge deadly obstacles, and collect valuable rewards as you push your limits in this addictive mobile game.
     
     🎮 GAMEPLAY FEATURES:
     • Intuitive swipe controls - Easy to learn, hard to master!
     • Three-lane running system with smooth lane switching
     • Dynamic obstacle generation keeps every run unique
     • Progressive difficulty that challenges your reflexes
     • Endless gameplay - How far can you go?
     
     💎 COLLECT & POWER-UP:
     • Coins - Collect to increase your score
     • Gems - Rare collectibles for extra points
     • Lightning bolts - Speed boosts and special powers
     • Shield power-ups for temporary invincibility
     
     🚧 AVOID OBSTACLES:
     • Deadly traps, scorpions, spiders, and more
     • Fires, bombs, and explosive hazards
     • Skull markers and cacti
     • Each obstacle requires quick reflexes to survive!
     
     🎵 AUDIO EXPERIENCE:
     • Immersive background music
     • Separate menu and gameplay soundtracks
     • Satisfying sound effects
     • Individual volume controls for music and effects
     
     🏆 ACHIEVEMENTS & PROGRESSION:
     • Track your high scores
     • Unlock achievements
     • Compete with yourself to beat your records
     • Level up your skills with each run
     
     ⚙️ SETTINGS & CONTROLS:
     • Customizable audio settings
     • Music and sound effect toggles
     • Vibration & haptics options
     • Smooth performance optimized for all devices
     
     🎯 PERFECT FOR:
     • Quick gaming sessions on the go
     • Competitive players seeking high scores
     • Fans of endless runner games
     • Anyone looking for a fun, challenging mobile experience
     
     📱 OPTIMIZED PERFORMANCE:
     • Smooth 60 FPS gameplay
     • Optimized battery usage
     • Works on a wide range of Android devices
     • Offline play supported
     
     Download Wobbly Runner now and see how long you can survive! Master the wobble, dodge the dangers, and become the ultimate runner!
     
     Follow us for updates and tips!
     ```

3. **Graphics Assets (REQUIRED)**

   **App Icon:**
   - Already set: `assets/images/icon.png`
   - 512x512 PNG, 32-bit, max 1024KB

   **Feature Graphic (REQUIRED):**
   - Size: 1024 x 500 pixels
   - Format: PNG or JPEG
   - Create with game logo/title and gameplay screenshot
   - Upload in "Graphics" section

   **Phone Screenshots (REQUIRED - at least 2):**
   - Size: Recommended 1080 x 1920 pixels (portrait)
   - Format: PNG or JPEG
   - Need 2-8 screenshots
   - Show actual gameplay, menu, settings, achievements
   - **ACTION NEEDED:** Take screenshots from your device

   **Optional but Recommended:**
   - Tablet screenshots (7-inch and 10-inch)
   - Promo video (YouTube URL)

4. **Categorization**
   - **App category:** Games → Arcade
   - **Tags:** Select relevant tags like "casual", "runner", "arcade"

5. **Contact Details**
   - **Email:** (Your support email)
   - **Phone:** (Optional)
   - **Website:** (Optional - or use GitHub repo)

6. **Privacy Policy (REQUIRED)**
   - **Privacy policy URL:** 
     - You have: `docs/privacy-policy.html`
     - Need to host online or use: `https://github.com/Rashid-Indpro/wobbly-runner-native/blob/main/docs/privacy-policy.html`
     - Or host on GitHub Pages

7. Click **"Save"**

---

### Step 4: App Content - Data Safety

1. **Go to Policy → App content → Data safety**

2. **Data Collection**
   - Click **"Start"**
   - Question: "Does your app collect or share any of the required user data types?"
   - If NO user data collected: Select **"No, my app doesn't collect or share any of the required user data types"**
   - If you use ads: You may need to declare ad ID collection

3. **Data Security**
   - "Is all of the user data collected by your app encrypted in transit?"
   - Answer: **"Yes"** (if using HTTPS) or **"Not applicable"**
   
4. **Data Deletion**
   - "Do you provide a way for users to request that their data is deleted?"
   - If no data collected: **"Not applicable"**

5. **Review and Submit**
   - Review your answers
   - Click **"Submit"**

---

### Step 5: App Content - Ads Declaration

1. **Go to Policy → App content → App ads**
2. Click **"Start"**
3. Question: "Does your app contain ads?"
   - If using react-native-google-mobile-ads: **"Yes"**
   - If removed ads: **"No"**
4. Click **"Save"**

---

### Step 6: App Content - Content Rating

1. **Go to Policy → App content → Content rating**
2. Click **"Start questionnaire"**
3. **Enter email address** for rating certificate
4. **Select category:** Games
5. **Answer questionnaire:**
   - Violence: None (unless game has realistic violence)
   - Sexual content: None
   - Language: None (no profanity)
   - Controlled substances: None
   - Gambling: None
   - Interactive elements: May contain ads (if applicable)

6. Review ratings for different regions (ESRB, PEGI, etc.)
7. Click **"Submit"**

---

### Step 7: App Content - Target Audience

1. **Go to Policy → App content → Target audience and content**
2. Click **"Start"**
3. **Target age groups:**
   - Select age groups: "13-17", "18+"
   - Or if for kids: Select appropriate age
4. **Store Presence:**
   - "Is your app designed specifically for children?"
   - Answer: **"No"** (unless specifically for kids)
5. **App Details:**
   - Does your app contain ads? (Yes/No based on your setup)
6. Click **"Save"**

---

### Step 8: App Content - News Apps (Skip if not applicable)
- Only if app is a news app - **Skip this**

---

### Step 9: App Content - COVID-19 (Skip if not applicable)
- Only if app relates to COVID-19 - **Skip this**

---

### Step 10: App Content - Government Apps (Skip)
- Only for government apps - **Skip this**

---

### Step 11: Select App Category and Provide Contact Details

1. **Go to Store presence → Store settings**
2. **App category:** Games → Arcade
3. **Tags:** Add relevant tags
4. **Contact email:** Your support email
5. Click **"Save"**

---

## PHASE 3: SCREENSHOTS AND GRAPHICS

### Step 12: Create Required Graphics

**You need to create these assets:**

1. **Feature Graphic (1024x500)** - MANDATORY
   - Create an image with:
     - Game logo/title
     - Background showing gameplay
     - Vibrant colors
   - Tool: Use Canva, Photoshop, or GIMP

2. **Screenshots (Minimum 2)** - MANDATORY
   - Install internal test version on your device
   - Take screenshots of:
     - Main menu
     - Active gameplay
     - Settings screen
     - Game over screen with score
     - Achievements screen
   - Android: Use Power + Volume Down
   - Transfer to computer and upload

3. **Upload Graphics**
   - Go to: Store presence → Main store listing
   - Scroll to "Graphics" section
   - Upload Feature graphic
   - Upload Phone screenshots (at least 2)
   - Click **"Save"**

---

## PHASE 4: COUNTRIES AND PRICING

### Step 13: Select Countries and Pricing

1. **Go to Production → Countries/regions**
2. Click **"Add countries/regions"**
3. Select countries where you want to release:
   - **Option 1:** Select all available countries
   - **Option 2:** Select specific regions
4. **Pricing:** Free (already set in your app)
5. Click **"Save"**

---

## PHASE 5: TEST THE APP

### Step 14: Internal Testing Period

1. **Install from Internal Testing**
   - You and your testers should download and test
   - Test all features:
     - Audio (background music, menu music, sound effects)
     - Gameplay (obstacles, collectibles, scoring)
     - Settings (toggles work)
     - Game over and restart
     - Achievements
     - Share functionality

2. **Test for at least 2-3 days**
   - Find and fix any critical bugs
   - If bugs found:
     - Fix in code
     - Update version to 1.0.6
     - Build new AAB
     - Create new release in internal testing

3. **Monitor Crash Reports**
   - Go to: Monitor and improve → Crashes & ANRs
   - Check if any crashes reported
   - Fix if needed

---

## PHASE 6: CLOSED TESTING (OPTIONAL BUT RECOMMENDED)

### Step 15: Move to Closed Testing

1. **Go to Testing → Closed testing**
2. Click **"Create new release"**
3. **Copy from internal:**
   - Click **"Copy from a previous release"**
   - Select version 5 (1.0.5) from internal testing
4. **Or create new:**
   - Upload same AAB file
   - Add same release notes
5. **Create tester track:**
   - Click **"Testers"** tab
   - Create email list (can use same or create larger list)
   - Add up to 1000 testers
6. Click **"Save"**
7. Click **"Review release"**
8. Click **"Start rollout to Closed testing"**

9. **Test with closed testers for 3-7 days**

---

## PHASE 7: PRODUCTION RELEASE

### Step 16: Prepare for Production

**Before proceeding, ensure:**
- ✅ All App content sections completed (green checkmarks)
- ✅ Store listing complete with graphics
- ✅ Content rating received
- ✅ Data safety declared
- ✅ Privacy policy URL added
- ✅ App tested thoroughly in internal/closed testing
- ✅ No critical bugs or crashes
- ✅ Countries selected
- ✅ At least 2 screenshots uploaded
- ✅ Feature graphic uploaded

---

### Step 17: Create Production Release

1. **Go to Production → Production**
2. Click **"Create new release"**

3. **Release details:**
   - Click **"Copy from a previous release"**
   - Select version 5 (1.0.5)
   - Or upload AAB again

4. **Release name:** `1.0.5 - Production Launch`

5. **Release notes (same as before or updated):**
   ```
   🎮 Welcome to Wobbly Runner!
   
   • Endless runner gameplay with three-lane system
   • Collect coins, gems, and power-ups
   • Avoid obstacles and survive as long as you can
   • Customizable audio settings
   • Track your high scores and achievements
   • Smooth performance on all devices
   
   Download now and start your running adventure!
   ```

6. **Rollout percentage:**
   - Start with: **"Staged rollout"** at 20% (recommended for first release)
   - Or: **"Full rollout"** to 100% of users

7. Click **"Save"**
8. Click **"Review release"**

---

### Step 18: Final Review and Submit

1. **Review All Sections**
   - Dashboard will show any pending issues
   - All sections should have green checkmarks ✅
   - Fix any red X marks or warnings

2. **Submit for Review**
   - Go back to Production release
   - Click **"Start rollout to Production"**
   - Confirm by clicking **"Rollout"**

3. **Status will change to:**
   - "Pending publication"
   - "In review"

---

## PHASE 8: WAITING FOR GOOGLE REVIEW

### Step 19: Google Review Process

**Timeline:**
- Initial review: 1-7 days (usually 2-3 days)
- First app: May take longer

**What Google checks:**
- Policy compliance
- Malware/security
- Content rating accuracy
- Metadata accuracy
- Privacy policy compliance

**Possible Outcomes:**
1. ✅ **Approved:** App goes live automatically
2. ⚠️ **Rejected:** Email with reasons, fix and resubmit

---

### Step 20: After Approval - App Goes Live!

**When approved:**
1. You'll receive email notification
2. Status changes to "Published"
3. App appears on Play Store within hours
4. Users can find it by searching "Wobbly Runner"

**Post-Launch Actions:**
1. **Share your app:**
   - Copy Play Store URL
   - Share on social media
   - Share with friends/family

2. **Monitor performance:**
   - Go to: Monitor and improve → Statistics
   - Check: Downloads, crashes, ratings

3. **Respond to reviews:**
   - Go to: Grow → User reviews
   - Reply to user feedback

4. **Update regularly:**
   - Fix bugs reported
   - Add new features
   - Create new releases following same process

---

## CHECKLIST BEFORE PRODUCTION SUBMISSION

### Mandatory Requirements:
- [ ] AAB file uploaded
- [ ] App name, short description, full description filled
- [ ] At least 2 screenshots uploaded
- [ ] Feature graphic (1024x500) uploaded
- [ ] App icon confirmed (512x512)
- [ ] Privacy policy URL added
- [ ] Content rating completed
- [ ] Data safety section completed
- [ ] App ads declaration completed
- [ ] Target audience selected
- [ ] App category set (Games → Arcade)
- [ ] Contact email provided
- [ ] Countries selected
- [ ] App tested in internal testing
- [ ] No critical crashes or bugs

### Optional but Recommended:
- [ ] Closed testing completed
- [ ] Multiple testers tested the app
- [ ] Promo video added
- [ ] Tablet screenshots added
- [ ] Website URL added
- [ ] Phone number added

---

## QUICK COMMAND REFERENCE

### Build AAB:
```powershell
cd android
.\gradlew bundleRelease
```

### Find AAB:
```
android\app\build\outputs\bundle\release\app-release.aab
```

### Update Version:
- Edit: `app.json` - change "version"
- Edit: `android/app/build.gradle` - change versionCode and versionName
- Build new AAB

---

## TROUBLESHOOTING

### "App bundle not signed" error:
- Make sure keystore is configured in `gradle.properties`
- Check: WOBBLY_RUNNER_UPLOAD_STORE_FILE path is correct

### "App doesn't meet target API level" error:
- Update targetSdkVersion in build.gradle
- Currently set to 36 ✅

### "Missing privacy policy":
- Add URL in Store listing → Privacy policy
- Must be publicly accessible URL

### "Missing screenshots":
- Upload at least 2 phone screenshots
- Must be actual app screenshots (not mockups)

---

## SUPPORT

**Google Play Console Help:**
https://support.google.com/googleplay/android-developer

**Your App Details:**
- **Package:** com.wobblyrunner.app
- **Current Version:** 1.0.5 (Version Code 5)
- **AAB Location:** android\app\build\outputs\bundle\release\app-release.aab

---

## NEXT STEPS NOW

1. **Click "Edit release"** on the Draft 5 (1.0.5) in Internal Testing
2. **Upload the AAB file** from: `android\app\build\outputs\bundle\release\app-release.aab`
3. **Add release notes** (provided above)
4. **Save and Review release**
5. **Start rollout to Internal testing**
6. **Add testers** (create email list with your email)
7. **Complete all App Content sections** while testers test
8. **Create screenshots** and feature graphic
9. **Test for 2-3 days**
10. **Create Production release**

Good luck with your launch! 🚀
