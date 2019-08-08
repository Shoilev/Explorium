# Explorium
Travel &amp; Game App

Run the app:
npm install

for virtual debug use:
react-native start --reset-cache
or
react-native run-android

for physical debug use:
adb devices
adb shell input keyevent 82

cd android && /gradlew build --warning-mode=all --stacktrace
cd android && ./gradlew clean
cd android && ./gradlew bundleRelease
