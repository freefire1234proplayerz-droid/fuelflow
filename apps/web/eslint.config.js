export default [
  {
    ignores: ["dist", "node_modules", "*.config.*", "*.d.ts"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: "18.3",
      },
    },
    plugins: {
      react: {
        settings: {
          react: {
            version: "18.3",
          },
        },
      },
      "react-hooks": {},
      "react-refresh": {},
      "@typescript-eslint": {},
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];