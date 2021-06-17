import { Plugin } from "vite";
import { readdirSync, copyFileSync } from "fs";

export default (): Plugin => {
  let srcRoot = "./src";
  let outRoot = "./dist";

  return {
    name: "vite:global-declare-file-collector",
    apply: "build",
    enforce: "post",
    closeBundle() {
      readdirSync(srcRoot)
        .filter((file) => file.endsWith(".d.ts") && file !== "vite-env.d.ts")
        .forEach((file) => {
          copyFileSync(`${srcRoot}/${file}`, `${outRoot}/${file}`);
        });
    },
  };
};
