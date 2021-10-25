# Log parser

## Scripts
### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

## Parser data structure
- Changed from Map to Object for shorter lines and easier to map in UI component, might need to use back Map to see if it's faster


## TODO
- Improve HomePage test cases by figure out how to test useRef + input
- Extract File input into separate component
- Gives loading status when processing large file
- Failed to use 'readline' to ready line by line to improve memoery usage, maybe use read stream to improve?

