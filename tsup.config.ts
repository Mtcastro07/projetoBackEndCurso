import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  format: ["esm"],
  outDir: "build",
  sourcemap: true,
  target: "esnext",
});
