# React Native Example

## How to start - Android

1. Setup the development environment. [React Native Docs](https://reactnative.dev/docs/environment-setup)
   1. Ensure that you follow all the steps for installing dependencies such as node, watchman, Java development kit, and Android development environment
   2. You can return to this guide once you reach the 'Creating a new application' section.
2. Run "npm install" in the project root folder. Wait until the installation completes.
3. Open `android/app/src/main/assets`.
4. Copy all files from the [charting_library repo](https://github.com/tradingview/charting_library/). The earliest supported version of the Charting Library is 23. If you get 404 then you need to [request an access to this repository](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/). **Note**: Unlike some of the other examples you should copy all files from the repository not just the `datafeeds` and `charting_library` directories.
   - The folder structure should resemble this:
     - android/app/src/main/assets/index.html
     - android/app/src/main/assets/charting_library/
     - android/app/src/main/assets/datafeeds/
5. Run "npx react-native run-android" to start installing the application to a device.

## How to start - iOS

1. Setup the development environment. [React Native Docs](https://reactnative.dev/docs/environment-setup)
   1. Ensure that you follow all the steps for installing dependencies such as node, watchman, ruby (ensure that you install the correct version), xCode, and cocoaPods.
   2. You can return to this guide once you reach the 'Creating a new application' section.
2. Run "npm install" in the project root folder. Wait until the installation completes.
3. Open `/ios/ChartingLibraryExample.xcodeproj` in Xcode.
4. Right click on the `charting_library` folder and select "Add Files to ...". Select "Create folder references" for the added folders. This is important because the library contains files with the same name, but in different folders, so the "Create folder references" option adds files to your application bundle with the same folder structure as in the library.
   - Select all the files from the [charting_library repo](https://github.com/tradingview/charting_library/). This should include the `html` files, and the `charting_library` and `datafeeds` folders.
5. Run `pod install` within the `ios` folder
6. Run "npx react-native run-ios" to start installing the application to a device.

## Troubleshooting

If you have previously built an older version of this example in the same folder then you may need to clear out the old build files and artifacts. You can do this with the following command in your terminal (within the `react-native` folder):

```shell
git clean -fdxq .
```

This will remove all the untracked files in the folder.
