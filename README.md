# Asclepius.Tools

## What's in this Repo

  - **RW** - Full React Website for Asclepius Tools (*FULL_WEBSITE_VERSION*)
  - **BE** - A Web Extension for Firefox and Chrome that consists of just the Web Chat UI to Asclepius Tools as a browser drop- down (*BROWSER_EXTENSION_VERSION*)
  - **RC** - A version of the React Website that renders only the Web Chat page (*WEB_CHAT_ONLY_VERSION*)
  - The source code for the Web Chat UI itself that is shareda cross the above three versions, that can be edited only once to update all versions (*WEB_CHAT_SOURCE_CODE*)

### The RW is available at https://steviejeebies.github.io/SWENG2020/

## How to Use

You will need **Node.js** and **Yarn** installed in order to develop or run the following locally.

The folder **WEB_CHAT_SOURCE_CODE** contains files that are necessary to run the Web Chat UI in all three versions of the application. Due to restrictions with *create-react-app* not allowing us to import component files outside of a given app's own *src* folder, we weren't able to have the source code in one folder that RW, BE and RC could read from without making any modifications to the code or folders. I had to separate the files that all versions shared into the above folder, and leave the *src* folder of all three versions mostly empty. 

**If you want to build any of the the versions RW, BE or RC, you have to copy the contents of the WEB_CHAT_SOURCE_CODE folder, and paste it in the *src* folder of that version of the app.** For RW, this src folder is called WEB_CHAT. You'll know you're pasting the files in the right folder, because there's a placeholder txt file there called *copy_contents_of_WEB_CHAT_SOURCE_CODE_here.txt*.

## Building RW and RC
Run the following instructions in the RW or RC folder:
```sh
npm install
npm start
```

## Building BE
Run the following instructions in the BE folder:
```sh
yarn install
```
If you want to develop the browser extension and have you changes continuously update without having to rebuild over and over, run: 
```sh
yarn watch
```

If you want to build the app, run: 
```sh
yarn build
```

Next, you need to install the extension has an add-on in your web browser. **The file you want to import in the *manifest.json* file in the *build* folder, NOT the *manifest.json* in the top directory of BE**.

For Firefox: 
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Installing

For Chrome: 
https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/

**Note**: If you want to publish the extension to the Firefox or Chrome Add-on store, you must remove "unsafe-eval" in directive "script-src" and "connect-src" from the build manifest.json, they can be found in the Content Security Policy (CSP). The values are needed for auto reloading (i.e. yarn watch), but can't be used when distributing the extension. 