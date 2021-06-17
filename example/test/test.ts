import { define_properties } from "../../src";
import { IsKeywordValue, IsStyleValue } from "../../src/utils/properties-utils";
import { get_current_path } from "../../src/utils/url-utils";

export enum Properties {
  ROUND = "--lilith-test-round",
  NAME = "--lilith-test-name",
  COLOR = "--lilith-test-color",
}

export const properties = define_properties({
  [Properties.ROUND]: {
    name: Properties.ROUND,
    inherits: false,
  },
  [Properties.COLOR]: {
    name: Properties.COLOR,
    inherits: false,
    syntax: "<color>",
    initialValue: "#000",
    ...IsStyleValue,
  },
  [Properties.NAME]: {
    name: Properties.NAME,
    inherits: false,
    ...IsKeywordValue,
  },
});
export function useTest() {
  (Reflect.ownKeys(properties) as (keyof typeof properties)[]).forEach(
    (key) => {
      console.log(
        `registrer property -> ${properties[key].name}: ${
          (properties[key] as any).syntax
        }`
      );
      CSS.registerProperty(properties[key]);
    }
  );

  CSS.paintWorklet.addModule(
    `${get_current_path(import.meta.url)}/runner/test-runner.js`
  );
}
