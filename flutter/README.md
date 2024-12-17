
# **Flutter TradingView Advanced Charts Example**

This project demonstrates how to integrate the **TradingView Advanced Charts Library** into a Flutter application. It includes full support for the library's features, including drawing tools and advanced configurations.

⚠️ **Note:** This implementation currently works **only for Android and iOS platforms**.

---

## **Setup Instructions**

### 1. **Clone the Project**

Clone this repository to your local environment:

```bash
git clone git@github.com:tradingview/charting-library-examples.git
cd flutter
```

### 2. **Download and Add TradingView Library**

To use the TradingView Advanced Charts Library:

1. Download the **Advanced Charts Library** from [TradingView](https://www.tradingview.com/advanced-charts/).
2. Copy and paste the entire library folder into your Flutter project at:

   ```
   assets/trading_view/
   ```

   Your folder structure should look like this:

   ```
   assets/
     trading_view/
       charting_library/
       datafeeds/
       index.html
       ...
   ```

---

### 3. **Update the project dependencies**

Run the following command to update the project dependencies:

```bash
flutter pub get
```

---

### 4. **Platform-Specific Configurations**

#### **Android**

Add Internet permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Ensure `hardwareAccelerated` & `usesCleartextTraffic` is enabled in the `application` tag:

```xml
<application
    android:usesCleartextTraffic="true"
    android:hardwareAccelerated="true"
    ... >
```

#### **iOS**

Update the `ios/Runner/Info.plist` to allow arbitrary loads:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

---

### 5. **Run the Example**

Run the Flutter project:

```bash
flutter run
```

The app will launch and display the **TradingView Advanced Charts** using a `WebView`.

---

## **Code Overview**

### **Loading the Advanced Charts**

- The app uses `flutter_inappwebview` to load a local HTML file (`index.html`) that initializes the TradingView widget.
- The HTML file is loaded from the assets folder.

---

## **Troubleshooting**

1. **CORS Issues**:
   If you face **CORS errors**, ensure:
   - You are loading all resources locally.
   - You have configured `flutter_inappwebview` with `allowFileAccessFromFileURLs` and `allowUniversalAccessFromFileURLs`.

2. **Assets Not Found**:
   Verify that:
   - The `pubspec.yaml` file includes all required assets.
   - The folder structure is correct.

3. **Library Access**:
   Ensure you have the necessary permissions from TradingView to use the **Advanced Charts Library**.

---

## **Limitations**

- Currently supported only on **Android** and **iOS**.
- Requires manual integration of the TradingView library.

