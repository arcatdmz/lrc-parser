import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import tsModule from "typescript";

import pkg from "./package.json" with { type: "json" };

function comments(_node, comment) {
  const { value, type } = comment;
  if (type == "comment2") {
    // multi-line comment
    return /@preserve|@license|@cc_on/i.test(value);
  }
}

const ts = typescript({ typescript: tsModule, clean: true });
const tsr = terser({ output: { comments } });

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "es"
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: process.env.NODE_ENV === "development" ? [ts] : [ts, tsr]
  }
];
