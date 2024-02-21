module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "./.eslintrc-auto-import.json",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "no-unused-vars": "off",
    "no-empty": "warn",
    "react/prop-types": "off",
    "react-refresh/only-export-components": "error",
  },
};
