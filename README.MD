# A Wordle clone app

Original game: [https://www.nytimes.com/games/wordle/index.html][original-game-url]

## Demo
Url: [https://duc168.github.io/wordle/][https://duc168.github.io/wordle/]
## Features

- Basic features are the same as Wordle.
- The actual keyboard input and UI keyboard click works normally.
- A word cannot exceed 5 characters.
- An error toast is displayed if one submits without filling in 5 characters.
- An error toast is displayed and one cannot submit a word if the typed-in word is invalid
- The background colors of the tiles and the keyboard change after submission.
- The number of submissions cannot exceed 6 times.
- The share pop-up will be displayed if one submits for the 6th time or get the correct word.
- The result text is copied to clipboard if one clicks on the share button in the share pop-up (Below is the text format of the result sharing text)
    ```javascript
    Wordle {YYYY-MM-DD hh:mm:ss} {attempt count}/6

    (Attempted tiles shown in square emojis)
    
    // ex)
    // Wordle 2022-03-04 14:52:08 5/6
    // 
    // ⬛⬛⬛⬛🟩
    // 🟨⬛⬛⬛⬛
    // 🟩🟩⬛⬛🟨
    // 🟩🟩🟩🟩🟩
    ```
- Click on the try again button in the share pop-up to initialize the correct words and submitted words. Then the pop-up is closed.
- Click on the close button in the share pop-up to close the pop-up.
- Words allowed in the game is limited to the words in words.json file.

## Tech


- [react](https://reactjs.org/) - A JavaScript library for building user interfaces
- [styled-components](https://styled-components.com/) - Use the best bits of ES6 and CSS to style your apps without stress
- [reactjs-popup](https://react-popup.elazizi.com/) -A simple React popup component.
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction) - An easy-to-setup React component for toasting
- [lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
- [framer-motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [axios](https://axios-http.com/) - A simple promise based HTTP client for the browser and node.js
- [uuid](https://www.npmjs.com/package/uuid) - A tool to create random UUID

Otherwise, it uses:
- [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for coding convention.
- [typescript](https://www.typescriptlang.org/) -  A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity 

## Installation

Requires [Node.js](https://nodejs.org/) v14.18+ to run.

Install the dependencies and devDependencies and start the development server. ([http://127.0.0.1:9999/](http://127.0.0.1:9999/))

```sh
cd <project-path>
yarn 
yarn dev
```

For production environments preview ([http://127.0.0.1:8080/](http://127.0.0.1:8080/))

```sh
yarn
yarn build
yarn preview
```


## Commit Message Convention

### Format

`<type>: <description>`
Example: `feat: add speakers section`

### 1. Type

Available types are:

- feat → Changes about addition or removal of a feature. Ex: `feat: add table on landing page`, `feat: remove table from landing page`
- fix → Bug fixing, followed by the bug. Ex: `fix: illustration overflows in mobile view`
- docs → Update documentation (README.md)
- style → Updating style, and not changing any logic in the code (reorder imports, fix whitespace, remove comments)
- chore → Installing new dependencies, or bumping deps
- refactor → Changes in code, same output, but different approach
- ci → Update github workflows, husky
- test → Update testing suite, cypress files
- revert → when reverting commits
- perf → Fixing something regarding performance (deriving state, using memo, callback)


### 3. Description

Description must fully explain what is being done.

Add BREAKING CHANGE in the description if there is a significant change.

**If there are multiple changes, then commit one by one**

- After colon, there are a single space Ex: `feat: add something`
- When using `fix` type, state the issue Ex: `fix: file size limiter not working`
- Use imperative, and present tense: "change" not "changed" or "changes"
- Don't use capitals in front of the sentence
- Don't add full stop (.) at the end of the sentence