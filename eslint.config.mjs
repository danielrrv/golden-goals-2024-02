import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended  from "eslint-plugin-prettier/recommended"

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node, ecmaVersion: 12 } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": "off",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "never"],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-multi-spaces": "error",
      "space-before-function-paren": ["error", "never"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "space-infix-ops": "error",
      "keyword-spacing": ["error", { before: true, after: true }],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "block-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
    },
  },
  eslintPluginPrettierRecommended,
  
];
