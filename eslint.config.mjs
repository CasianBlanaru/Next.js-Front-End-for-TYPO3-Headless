import next from "eslint-config-next";

const eslintConfig = [
  next[0],
  next[1],
  next[2],
  {
    ignores: ["node_modules", "dist"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
export default eslintConfig;