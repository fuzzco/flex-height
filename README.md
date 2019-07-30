Boilerplate for Fuzzco Vue components.

## Usage

1. `degit fuzzco/component-base your-new-component-directory` (more info about [degit](https://github.com/Rich-Harris/degit))
1. Open `your-new-component-directory` and run `npm run name` to name your component.
1. See [Development](#development) and [Deployment](#deployment) below.

## Development

`npm run dev`

Runs [vue-cli-service serve](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve) at `demo/App.vue`. You can create a demo of the component in a Vue environment here. This is also the demo that will be built with `npm run buildDemo` and saved in the `docs/` directory.

## Deployment

_**Note:** If you haven't run `npm run name`, you'll need either do that or:_

1. Replace `flex-height` and `src/YourComponentFile.vue` in the `build` script with your component's library name and entry point
1. Set `package.json`'s `main` to `dist/flex-height.common.js` to enable importing in outside Vue apps.

### Publishing

This scaffold is designed for quick NPM publishing to the Fuzzco scope. To do so:

`npm publish --access public` the first time
`npm publish` afterwards

You should commit and push after publishing, since `npm publish` will run `npm run buildDemo` and build an up-to-date demo for the repo's GitHub Pages.

To activate a repo's GitHub Page:

1. Go to the repo's Settings
1. Scroll down to "GitHub Pages"
1. Switch the `source` to `master branch /docs folder`

### Building

If you don't want to publish:

`npm run build`

Runs `npm run buildDemo` and [vue-cli-service build](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-build) in `library` mode.
