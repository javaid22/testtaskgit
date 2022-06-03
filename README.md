# kreativrudel test project

## Purpose

1) The design which is to be implemented: https://www.figma.com/proto/MnZGXDbHGMcpIFbQ9AX3FX/KR_Landingpage?page-id=2%3A60&node-id=2%3A66&viewport=241%2C48%2C0.25&scaling=scale-down-width&starting-point-node-id=2%3A66
2) All fonts and color defintions: https://www.figma.com/proto/MnZGXDbHGMcpIFbQ9AX3FX/KR_Landingpage?page-id=0%3A1&nod[…]41%2C48%2C0.13&scaling=scale-down&starting-point-node-id=2%3A2

### Goal

The layout given in 1) has to be implemented. All related style and font definitions are given in 2) .

1) Make it responsive using your best judgment. (responsive views are in the figma design, see (1))
2) Use ECMAScript 6 in project implementation
3) Use and implement the BEM naming convention standard for CSS class names.
4) Use semantic markups and respect other SEO basics while structuring your HTML.
5) **BONUS**: Implement useful testing e.g. E2E Testing.
6) **BONUS**: Provide an online demo of the implementation e.g. Netlify.

### Structure

```
.
├── src                           [source files]
│   ├── assets                    [any static assets should be store in this directory]
│   │   ├── fonts
│   │   └── img
│   ├── js                        [js source files]
│   └── scss                      [scss source files]
│       ├── abstracts
│       ├── base
│       ├── components
│       ├── layout
│       ├── pages
│       ├── print
│       ├── themes
│       └── vendors
└── web                           [is the document root. all files from src are compiled and added in web/dist or web/assets]
```

All source files should go into the respective directories. If you have any static assets please add them to the `src/assets` directory.

When the watch task is running then all changes in the source files are reflected into the ``web`` directory.

#### SCSS

Entrypoint for the scss file: `./src/scss/index.scss`.

You can freely extend the given structure to meet the project requirements.


#### JS

Entrypoint for the js file: `./src/js/index.js`.


### Requirements

1) nodejs (https://nodejs.org/en/)
2) nvm (https://github.com/nvm-sh/nvm)

### Installations

All these steps needs to be executed in the projects' root directory.

1) `nvm use`
2) `npm install`
3) `npm run watch`

Now the project is started. The project is accessible at: http://localhost:8000

