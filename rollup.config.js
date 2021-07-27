import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default {
  input: "index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "esm",
      sourcemap: true,
      strict: false,
    },
    {
      file: packageJson.module,
      format: "cjs",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({ useTsconfigDeclarationDir: true })],
};
