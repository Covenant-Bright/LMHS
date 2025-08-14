import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Disable all rules by default
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    rules: {},
  },
  // Include other base configs, but they will not apply rules unless you re-enable them
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
