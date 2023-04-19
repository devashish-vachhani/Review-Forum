1. To install firebase use: $> `npm install -g firebase-tools`
2. Start the emulator with: $> `firebase emulators:start --import .\tests-acceptance\export_directory\`
3. Start the gui
4. Make sure firefox is updated to version 112
5. Go to the tests-acceptance folder and run these commands:

    $> `npm install`

    $> `npm run webdriver-update`

    $> `npm run webdriver-start`

You should see something like:
...
16:42:54.030 INFO [SeleniumServer.boot] - Selenium Server is up and running on port 4444

6. Run `npm test`
