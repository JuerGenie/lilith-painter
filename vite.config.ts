import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import dfc from "./plugins/global-declare-file-collector";

import path from "path";

function resolve(...paths: string[]) {
  return path.resolve(__dirname, ...paths);
}

export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      "^((/src)|(/example))/.*\\.js(\\?.*)?": {
        target: "http://localhost:4000",
        rewrite(path) {
          console.log("rewrite", path, "->", path.replace(".js", ".ts"));
          return path.replace(".js", ".ts");
        },
      },
    },
  },
  build: {
    lib: {
      entry: resolve("src/index.ts"),
      name: "LilithPainter",
    },
  },
  plugins: [
    dts({
      compilerOptions: {
        noEmit: false,
      },
      exclude: ["example"],
      beforeWriteFile(filePath: string, content: string) {
        if (filePath.startsWith(resolve("dist/src"))) {
          return {
            filePath: filePath.replace(resolve("dist/src"), resolve("dist")),
            content,
          };
        }
      },
    }),
    dfc(),
  ],
});
