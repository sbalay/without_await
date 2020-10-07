{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
      "jest": true
  },
  "plugins": [
    "react-hooks"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ios.js", ".android.js"]
      }
    }
  },
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "class-methods-use-this": 0,
    "comma-dangle": 0,
    "curly": ["error", "all"],
    "function-paren-newline": ["error", "consistent"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/accessible-emoji": 0,
    "max-len": ["error", { "code": 80, "ignoreComments": true }],
    "no-use-before-define": 0,
    "object-curly-newline": ["error", { "consistent": true }],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "return" }
    ],
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": ["error", {
      "html": "enforce",
      "custom": "ignore",
      "exceptions": []
    }]
  },
  "overrides": [{
    "files": ["**/__tests__/**/*.spec.js?(x)", "**/fabricators/*.js"],
    "rules": {
      "global-require": 0,
      "import/extensions": 0,
      "import/first": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-unresolved": 0
    }
  }]
}
