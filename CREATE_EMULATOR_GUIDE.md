# 📱 Create Android Emulator - Step by Step

## Quick Steps (Follow in Android Studio)

1. **Open Device Manager**
   - In Android Studio, click the phone icon in top toolbar
   - OR: Tools → Device Manager

2. **Create Virtual Device**
   - Click "Create Device" button
   - Select phone: **Pixel 5** (recommended)
   - Click "Next"

3. **Select System Image**
   - Choose: **Android 15.0 (VanillaIceCream)** - API 35
   - OR: **Android 14.0 (UpsideDownCake)** - API 34
   - Click "Download" if not downloaded
   - Wait for download to complete
   - Click "Next"

4. **Verify Configuration**
   - Name: Leave default (e.g., "Pixel 5 API 34")
   - Click "Finish"

5. **Start Emulator**
   - In Device Manager, click ▶️ (Play button) next to your device
   - Wait 30-60 seconds for emulator to boot

6. **Run Your App**
   ```powershell
   npx expo run:android
   ```

---

## 🚀 Quick Commands

### After emulator starts:

```powershell
# Build and run
npx expo run:android
```

The app will automatically install on the emulator.

---

## ⚡ Faster Alternative: Use Physical Device

1. Enable Developer Options on your phone:
   - Settings → About Phone → Tap "Build Number" 7 times
   
2. Enable USB Debugging:
   - Settings → Developer Options → Enable "USB Debugging"
   
3. Connect phone via USB cable

4. Run:
   ```powershell
   npx expo run:android
   ```

---

## ✅ Verification

When emulator/device is ready:

```powershell
# Check connected devices
adb devices
```

Should show:
```
List of devices attached
emulator-5554   device
```

Then run:
```powershell
npx expo run:android
```

Build will take 5-15 minutes first time. After that, the app will launch with automatic caption support! 🎉
