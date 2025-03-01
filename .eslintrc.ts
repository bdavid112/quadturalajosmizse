module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  rules: {
    "react/prop-types": "off", // Disable PropTypes if using TypeScript
    "react/react-in-jsx-scope": "off"
  }
};

