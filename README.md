# nativescript-raygun

**nativescript-raygun** is a plugin for NativeScript which adds support for error reporting with [Raygun](https://raygun.io/). The plugin uses the native Raygun SDKs for iOS and Android.


## Installation

```bash
tns plugin add nativescript-raygun
```

## Usage

Firstly, you need to create Raygun applications for your iOS and Android apps. You'll get a separate API key for each.

Somewhere central in your app (such as `app.js`), you need to start the Raygun error reporting.

```js
var application = require("application");
var raygun = require("nativescript-raygun");

raygun.start(application.ios ? "your-ios-key-here" : "your-android-key-here");
```

And that's it! If your app crashes, the error will be sent to Raygun (see notes below).

If you have users that log into your app, you will want to identify them with Raygun so errors they encounter will be tracked against that user. After starting Raygun error reporting, or when the user logs into your app, identify them:

```js
raygun.identify({
  identifier: user.id.toString(), // identifier must be a string
  email: user.email,
  fullName: user.first_name + " " + user.last_name,
  firstName: user.first_name
});
```

## Notes

When testing that error reporting is working correctly, note that for iOS, errors will not be submitted until the app is next opened by the user. Also note that errors will not be submitted when the app is hooked up to the Xcode debugger.

To test error reporting is working on iOS, you should run the app on a simulator, hit the stop button in Xcode, start the app in the simulator (which is no longer hooked up to the Xcode debugger) and cause a crash. Open the app, and the crash report will be sent to Raygun.

Android crashes will be submitted immediately.