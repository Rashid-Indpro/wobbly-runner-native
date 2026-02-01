# Google Play Store Release Guide - Wobbly Runner v1.0.3

## Current Build Information
- **Version**: 1.0.3
- **Version Code**: 4
- **Package Name**: `com.wobblyrunner.app`
- **AdMob App ID**: `ca-app-pub-9218417844276973~2957627671`
- **Target SDK**: 36
- **Min SDK**: 24

## ⚠️ IMPORTANT: Pre-Registration Strategy
Since AdMob ads are not yet active, we'll use **Pre-Registration** to:
- ✅ List the app on Play Store (visible to users)
- ✅ Allow users to pre-register for notifications
- ✅ Build anticipation and gather early interest
- ❌ Users CANNOT install yet (Coming Soon status)
- 🎯 Launch officially once ads are fully configured

---

## Step 1: Generate Android App Bundle (AAB)

### 1.1 Build the AAB
```bash
cd android
.\gradlew bundleRelease
```

### 1.2 Locate the AAB File
After successful build, find your AAB at:
```
android\app\build\outputs\bundle\release\app-release.aab
```

### 1.3 Verify the AAB (Optional)
- Size should be ~30-50MB (smaller than APK)
- Contains all architectures in a single file

---

## Step 2: Prepare Play Store Assets

### 2.1 Required Graphics (Create these in Figma/Photoshop)

#### App Icon
- ✅ Already have: `assets/images/icon.png` (512x512)

#### Feature Graphic (Required)
- **Size**: 1024 x 500 pixels
- **Format**: PNG or JPEG
- **Content**: Showcase "InteraMinds Presents Wobbly Runner"
- **Location**: Save as `play-store-assets/feature-graphic.png`

#### Screenshots (Minimum 2 required)
- **Phone**: 16:9 ratio (1920x1080 recommended)
- **Tablet**: 16:10 ratio (optional but recommended)
- **Quantity**: At least 2, maximum 8
- **Content**: 
  1. Main menu screen
  2. Gameplay screen
  3. Game over/achievements screen
  4. Settings/store screen
- **Location**: Save in `play-store-assets/screenshots/`

#### Promo Video (Optional but Highly Recommended)
- **Length**: 30 seconds to 2 minutes
- **Format**: YouTube video URL
- **Content**: Gameplay walkthrough

---

## Step 3: Create Google Play Console Account

### 3.1 Developer Account Setup
1. Go to https://play.google.com/console
2. Sign in with your Google account
3. Pay the one-time $25 registration fee
4. Complete developer profile:
   - Developer name: **Interaminds** (or your preferred name)
   - Email: support@interaminds.com
   - Website: https://interaminds.com
   - Address: Your business address

### 3.2 Account Verification
- Verify email address
- Set up two-factor authentication (required)
- Complete identity verification if requested

---

## Step 4: Create New App in Play Console

### 4.1 Start App Creation
1. Click "Create app" in Play Console
2. Fill in basic details:

**App Details**:
- **App name**: Wobbly Runner
- **Default language**: English (United States)
- **App or Game**: Game
- **Free or Paid**: Free

**Declarations**:
- ✅ This is my app
- ✅ I acknowledge Google Play's Developer Program Policies
- ✅ I acknowledge US export laws apply

### 4.2 Set Up App Content

#### Privacy Policy (REQUIRED)
- **URL**: https://interaminds.com/#privacy
- Make sure this page exists and is accessible

#### App Access
- Select: "All functionality is available without special access"
- OR if you need test accounts, provide them

#### Ads Declaration
- ✅ Yes, my app contains ads
- Select: "AdMob" as ad network

#### Content Rating
1. Click "Start questionnaire"
2. Select: **Casual/Arcade Game**
3. Answer questions honestly:
   - Violence: Mild (character falls/fails)
   - Controlled substances: None
   - Sexual content: None
   - Language: None
   - User interaction: No
4. Submit for rating

#### Target Audience
- **Age range**: 13+ (or appropriate for your game)
- ✅ App does not appeal primarily to children

#### News App (Skip if not applicable)

#### COVID-19 Contact Tracing (Skip)

#### Data Safety
This is CRUCIAL. Fill out carefully:

**Data Collection**:
- ✅ Yes, we collect or share data

**Data Types Collected** (via AdMob):
- ✅ Location (approximate)
  - Purpose: Advertising or marketing
  - Collection: Optional
  - Encrypted: Yes
  - Can be deleted: Yes

- ✅ Device or other IDs
  - Purpose: Advertising or marketing, Analytics
  - Collection: Optional
  - Encrypted: Yes
  - Can be deleted: Yes

**Data Usage**:
- All collected data is used for: Advertising and Analytics
- Data shared with: Google Mobile Ads SDK

#### Government Apps (Skip unless applicable)

---

## Step 5: Set Up Store Listing

### 5.1 Main Store Listing

Navigate to: **Store Presence** > **Main store listing**

#### App Name
```
Wobbly Runner
```

#### Short Description (80 characters max)
```
Dodge obstacles, collect coins, and master the wobbly path in this arcade runner!
```

#### Full Description (4000 characters max)
```
🎮 WOBBLY RUNNER - THE ULTIMATE ARCADE CHALLENGE! 🎮

Master the art of balance in this addictive endless runner! Dodge obstacles, collect coins, and see how far you can run on the wobbly path.

🌟 FEATURES:
• Simple one-tap controls - Easy to learn, hard to master
• Endless arcade gameplay with increasing difficulty
• Unlock unique character skins and power-ups
• Compete for high scores and achievements
• Smooth 60 FPS gameplay
• Stunning visual effects and animations
• Free-to-play with optional rewarded ads

🎯 GAMEPLAY:
Tap to move your character left or right as you run forward automatically. Avoid obstacles, collect coins, and use power-ups to extend your run. The longer you survive, the faster and more challenging it gets!

💎 POWER-UPS & UPGRADES:
• Invincibility Shield - Protect yourself from obstacles
• Magnet - Automatically collect nearby coins
• Score Multiplier - Double your points
• Unlock premium skins to customize your character

🏆 ACHIEVEMENTS:
Complete challenges and unlock special achievements. Track your progress and compete with players worldwide!

🎨 BEAUTIFUL DESIGN:
Experience smooth animations, vibrant colors, and a sleek modern interface that makes every run feel fresh and exciting.

📱 OPTIMIZED PERFORMANCE:
Designed for smooth gameplay on all Android devices. Low battery consumption and minimal storage requirements.

🆓 FREE TO PLAY:
Wobbly Runner is completely free! Watch optional rewarded ads to earn bonus coins and power-ups, or play entirely ad-free at your own pace.

---

Developed by Interaminds
Visit us at: https://interaminds.com
Support: support@interaminds.com

Download now and start your wobbly adventure! 🚀
```

#### App Icon
- Upload: `assets/images/icon.png` (512x512)

#### Feature Graphic
- Upload: `play-store-assets/feature-graphic.png` (1024x500)

#### Screenshots
- Upload at least 2 phone screenshots
- Optional: Add tablet screenshots

#### Promo Video (Optional)
- Add YouTube video URL if you created one

---

## Step 6: Content Settings

### 6.1 App Category
- **Category**: Games > Arcade
- **Tags**: runner, arcade, casual, endless runner, obstacle course

### 6.2 Contact Details
- **Email**: support@interaminds.com
- **Website**: https://interaminds.com
- **Phone**: (Optional but recommended)

### 6.3 External Marketing
- Choose whether you want to participate in Google's marketing programs

---

## Step 7: Set Up Pre-Registration (Coming Soon)

### 7.1 Why Pre-Registration?
Since AdMob ads are not yet fully active, we'll enable **Pre-Registration** to:
- Make app discoverable on Play Store
- Show "Coming Soon" badge
- Collect pre-registrations (users get notified at launch)
- Prevent premature installs before ads are configured
- Build initial user base and excitement

### 7.2 Enable Pre-Registration
1. Navigate to: **Release** > **Production**
2. Click "Create new release"
3. **IMPORTANT**: Before uploading AAB, enable pre-registration:
   - Go to: **Grow** > **Pre-registration**
   - Click "Set up pre-registration"
   - Choose: **Managed pre-registration**
   - Set expected launch date (e.g., 2-4 weeks from now)

### 7.3 Upload AAB
1. Return to: **Release** > **Production** > **Create new release**
2. Click "Upload" and select: `android\app\build\outputs\bundle\release\app-release.aab`
3. Wait for upload to complete (may take 1-2 minutes)
4. Google Play will process the AAB

### 7.4 Configure Pre-Registration Details

#### Release Name
```
Version 1.0.3 - Coming Soon
```

#### Pre-Registration Description
```
🎮 WOBBLY RUNNER IS COMING SOON! 🎮

Pre-register now to get notified when we launch!

✨ What to Expect:
• Addictive endless runner gameplay
• Beautiful graphics and smooth animations
• Multiple character skins and power-ups
• Achievement system and leaderboards
• Completely free to play

🎯 Why Pre-Register?
• Be among the first to play
• Get launch day notification
• Exclusive early access badge (coming soon)
• Support indie game developers

🚀 Expected Launch: Late February 2026

Pre-register now and get ready for the wobbly adventure! 🏃‍♂️💨

Follow us:
Website: https://interaminds.com
Email: support@interaminds.com
```

#### Expected Launch Date
- Set realistic date: 2-4 weeks from submission
- You can launch earlier if ready
- Users get notified automatically when you go live

---

## Step 8: Review and Submit (Pre-Registration)

### 8.1 Pre-Launch Checklist
Before submitting for pre-registration:
- ✅ AAB uploaded successfully
- ✅ Pre-registration enabled
- ✅ Expected launch date set
- ✅ Store listing complete (name, descriptions, screenshots)
- ✅ Privacy policy URL working
- ✅ Content rating received
- ✅ Data safety form completed
- ✅ Ads declaration confirmed (even if not active yet)
- ✅ App category selected
- ✅ Contact information added
- ✅ All required sections have green checkmarks

### 8.2 Submit for Review
1. Click "Review release" button
2. Confirm all information
3. Click "Start rollout to Production (Pre-registration)"
4. Confirm submission

### 8.3 What Users Will See
Once approved:
- ✅ App appears in Play Store search
- ✅ Shows "Coming Soon" badge
- ✅ "Pre-register" button instead of "Install"
- ✅ Users can add to wishlist
- ❌ Cannot install or download yet

---

## Step 9: Google Review Process (Pre-Registration)

### 9.1 Timeline
- **Pre-registration review**: 1-7 days (same as normal app)
- **Process**: Google still reviews the AAB fully
- **Approval**: App goes live in "Coming Soon" mode

### 9.2 After Approval
Your app will be visible on Play Store with:
- Coming Soon badge
- Pre-register button
- Full store listing (screenshots, description, etc.)
- User reviews: DISABLED (enabled after full launch)

---

## Step 10: When Ready to Launch (After Ads Are Active)

### 10.1 Verify AdMob Setup
Before launching:
1. ✅ AdMob app approved (not in "limited ads" status)
2. ✅ app-ads.txt file verified at: https://interaminds.com/app-ads.txt
3. ✅ Test ads showing in production APK/AAB
4. ✅ Rewarded ads working correctly
5. ✅ Ad frequency is reasonable (not too aggressive)

### 10.2 Go Live from Pre-Registration
1. Navigate to: **Grow** > **Pre-registration**
2. Click "Go live" button
3. OR create new production release:
   - Go to: **Release** > **Production**
   - Create new release (optional: bump to 1.0.4)
   - Click "End pre-registration and go live"

### 10.3 What Happens at Launch
- 🔔 All pre-registered users get notification
- 📲 "Pre-register" button changes to "Install"
- 🌟 App becomes fully available
- 📊 Install tracking begins
- ⭐ User reviews become enabled

### 10.4 Launch Day Actions
1. **Monitor closely**:
   - Check crash reports every hour
   - Watch ad impression metrics in AdMob
   - Monitor user reviews
   - Check ANR (App Not Responding) rate

2. **Prepare for issues**:
   - Have hotfix ready if needed
   - Monitor support email closely
   - Be ready to pause ads if issues occur

3. **Promote launch**:
   - Announce on social media
   - Update website with Play Store link
   - Thank pre-registered users

---

## Step 11: Post-Launch Actions

### 10.1 Monitor App Performance
1. Check **Dashboard** daily for:
   - Installs and uninstalls
   - Crash reports
   - ANR (App Not Responding) reports
   - User reviews and ratings

2. Set up alerts for:
   - Critical crashes
   - ANR rate increases
   - Review drops below 4 stars

### 10.2 Respond to Reviews
- Reply to user reviews within 24-48 hours
- Thank positive reviewers
- Address issues mentioned in negative reviews
- Show you're actively maintaining the app

### 10.3 Update app-ads.txt
For AdMob verification:
1. Create file at: `https://interaminds.com/app-ads.txt`
2. Add this line:
```
google.com, pub-9218417844276973, DIRECT, f08c47fec0942fa0
```
3. Wait 24 hours for Google to crawl and verify

---

## Step 12: Future Updates (After Full Launch)

### 12.1 Preparing Updates
When releasing new versions after full launch:

1. **Increment version numbers**:
   ```
   versionCode: 5 (must be higher than previous)
   versionName: "1.0.4" (for user display)
   ```

2. **Build new AAB**:
   ```bash
   cd android
   .\gradlew bundleRelease
   ```

3. **Create new release** in Play Console:
   - Production > Create new release
   - Upload new AAB
   - Add release notes
   - Submit

### 12.2 Staged Rollout (Recommended)
For major updates, use staged rollout:
1. Start with 5% of users
2. Monitor for 24 hours
3. If stable, increase to 10% → 20% → 50% → 100%
4. Pause/halt if issues detected

---

## Pre-Registration vs Full Launch Comparison

| Feature | Pre-Registration (Now) | Full Launch (After Ads Active) |
|---------|------------------------|-------------------------------|
| **Play Store Visibility** | ✅ Visible | ✅ Visible |
| **User Discovery** | ✅ Searchable | ✅ Searchable |
| **Install Button** | ❌ No (Pre-register button) | ✅ Yes |
| **Downloads** | ❌ 0 installs | ✅ Full access |
| **User Reviews** | ❌ Disabled | ✅ Enabled |
| **AdMob Requirements** | ⚠️ Can be pending | ✅ Must be active |
| **Notifications** | ✅ Users notified at launch | N/A |
| **Revenue** | ❌ $0 | ✅ Ad revenue |
| **Rankings** | ❌ Not in charts | ✅ Appears in charts |

---

## Troubleshooting Common Issues

### Issue 1: AAB Build Fails
**Error**: "Task failed with an exception"
**Solution**:
```bash
cd android
.\gradlew clean
.\gradlew bundleRelease
```

### Issue 2: Signature Verification Failed
**Error**: "Upload failed: Invalid signature"
**Solution**: 
- Ensure you're using the same keystore for updates
- Check keystore password is correct
- Verify key alias matches

### Issue 3: Version Code Conflict
**Error**: "Version code 4 has already been used"
**Solution**: Increment versionCode to 5 or higher

### Issue 4: App Not Showing in Search
**Solution**:
- Wait 2-4 hours after approval for indexing
- Pre-registration apps may have lower search priority
- Search for exact package name: "com.wobblyrunner.app"
- Check if app is available in your country
- Ensure app name and description contain searchable keywords

### Issue 5: Want to Cancel Pre-Registration
**Solution**:
1. Go to: **Grow** > **Pre-registration**
2. Click "Cancel pre-registration"
3. Choose: "Go live immediately" or "Return to draft"
4. If going live, ensure AdMob is ready first

---

## AdMob Configuration Checklist (Before Full Launch)

Before ending pre-registration and going live, verify:

### AdMob App Status
- [ ] App status: **READY** (not "Getting ready" or "Limited")
- [ ] Ad unit status: **ACTIVE** for rewarded ads
- [ ] Test ads working correctly
- [ ] Production ads serving (not just test ads)

### app-ads.txt Verification
- [ ] File created at: https://interaminds.com/app-ads.txt
- [ ] Contains: `google.com, pub-9218417844276973, DIRECT, f08c47fec0942fa0`
- [ ] Accessible publicly (no login required)
- [ ] Waited 24-48 hours for Google to verify
- [ ] Verification status: ✅ Verified in AdMob console

### Ad Implementation Testing
- [ ] Rewarded ads show correctly
- [ ] Ad frequency is not too aggressive
- [ ] Users can close ads properly
- [ ] Rewards granted after watching ads
- [ ] No crashes when showing/closing ads
- [ ] Consent dialog working (for GDPR/data)

### Revenue Tracking
- [ ] AdMob dashboard showing impressions
- [ ] Click-through rate (CTR) looks normal (>1%)
- [ ] eCPM (earnings per 1000 impressions) populated
- [ ] Payment information set up in AdMob
- [ ] Tax information submitted (if required)

---

## Important URLs

- **Play Console**: https://play.google.com/console
- **AdMob Console**: https://apps.admob.com
- **Your App Page** (after publish): https://play.google.com/store/apps/details?id=com.wobblyrunner.app
- **Privacy Policy**: https://interaminds.com/#privacy
- **Support Email**: support@interaminds.com

---

## Quick Command Reference

### Build AAB (App Bundle)
```bash
cd android
.\gradlew bundleRelease
```

### Build APK (for testing)
```bash
cd android
.\gradlew assembleRelease
```

### Clean Build
```bash
cd android
.\gradlew clean
.\gradlew bundleRelease
```

### Check Bundle Location
```
android\app\build\outputs\bundle\release\app-release.aab
```

---

## Final Checklist Before Submit (Pre-Registration)

- [ ] Version bumped to 1.0.3 (versionCode: 4)
- [ ] AAB generated successfully
- [ ] Package name is `com.wobblyrunner.app`
- [ ] AdMob IDs configured correctly
- [ ] **Pre-registration ENABLED** ⭐
- [ ] **Expected launch date SET** ⭐
- [ ] Privacy policy URL accessible
- [ ] Feature graphic created (1024x500)
- [ ] At least 2 screenshots uploaded
- [ ] App description written (with "Coming Soon" messaging)
- [ ] Content rating completed
- [ ] Data safety form filled
- [ ] Ads declared
- [ ] Contact email set: support@interaminds.com
- [ ] All Play Console sections have green checkmarks
- [ ] Tested AAB on physical device

### Additional Pre-Registration Checklist
- [ ] Pre-registration description explains "Coming Soon" status
- [ ] Expected launch date is realistic (2-4 weeks)
- [ ] Marketing plan ready for pre-registration period
- [ ] AdMob setup in progress (will complete before launch)
- [ ] app-ads.txt file ready to deploy

---

## Support & Questions

If you encounter issues during the release process:

1. **Play Console Help**: https://support.google.com/googleplay/android-developer
2. **Email Support**: support@interaminds.com
3. **Check Status Page**: https://status.play.google.com

---

**Good luck with your pre-registration launch! 🚀**

## Quick Summary: Pre-Registration Strategy

1. **NOW**: Submit app for pre-registration
   - App visible on Play Store with "Coming Soon" badge
   - Users can pre-register (get notified at launch)
   - NO installs allowed yet
   - Build anticipation and early user base

2. **DURING PRE-REG**: Complete AdMob setup
   - Verify app-ads.txt
   - Ensure ads are approved and serving
   - Test thoroughly
   - Fix any issues before full launch

3. **WHEN READY**: Go live from pre-registration
   - All pre-registered users notified
   - "Install" button becomes available
   - Full app launch with working ads
   - Revenue generation begins

This strategy gives you time to perfect AdMob integration while building buzz! 🎯

---

*Generated for Wobbly Runner v1.0.3*
*Package: com.wobblyrunner.app*
*Strategy: Pre-Registration → Full Launch*
*Date: February 1, 2026*
