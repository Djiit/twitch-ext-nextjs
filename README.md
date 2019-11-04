# twitch-ext-nextjs

Twitch Extension Next.js boilerplate.

[Check out this blog post to learn more about how we created this](https://dev.to/djiit/bootstrapping-a-twitch-extension-with-nextjs-3k7d)

## Usage with the Developer Rig

Clone this repo and open a terminal :

```sh
npm i # or `yarn`
```

Using the Twitch Developer Rig, you can easily use this NextJS setup on your local machine. BConfigure your extension before using it in the Rig: go to your [Twitch developer console](https://dev.twitch.tv/console) and make sure that the "Testing Base URI" is set to http://localhost:3000 (the default for a NextJS project).

Once you have your project in your Rig, make sure you tells it the right command for Front End, i.e. `npm run dev` (or `yarn dev`).

You should be able to launch "views" inside the rig and play with your extension!

## Publish your extension

Run `yarn export`, zip the content of the `out` folder and upload it in your Extension Dashboard.

## Credits

Created by [@djiit](https://github.com/Djiit) and [@alacroix](https://github.com/alacroix) during the [Twitch Dev Jam 2019](https://twitchdevjam.devpost.com/).

