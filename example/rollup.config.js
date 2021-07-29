import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";

export default {
  input: "./index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    postcss({
      extensions: [".css"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
  ],
};
