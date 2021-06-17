import { PropertyDefinitions } from "./utils/properties-utils";

type ValueTypeMap = {
  is_style_value: CSSStyleValue;
  is_unit_value: CSSUnitValue;
  is_keyword_value: CSSKeywordValue;
};

type MapToType<P extends CSS.PropertyDefinition, K extends keyof P = keyof P> =
  Extract<K, keyof ValueTypeMap> extends never
    ? CSSProperty
    : {
        [key in Extract<K, keyof ValueTypeMap>]: ValueTypeMap[key];
      } extends { [key in Extract<K, keyof ValueTypeMap>]: infer R }
    ? R
    : never;

type PropertyGetter<
  P extends PropertyDefinitions,
  K extends keyof P = keyof P
> = {
  [key in K]: (k: key) => MapToType<P[key]>;
}[K];
type Area = {
  width: number;
  height: number;
};
export type PropertyMap<
  P extends PropertyDefinitions,
  K extends keyof P = keyof P
> = { get: UnionToIntersection<PropertyGetter<P, K>> };
type PaintRunner<P extends PropertyDefinitions> = (
  ctx: PaintRenderingContext2D,
  geom: Area,
  properties: PropertyMap<P>
) => void;

export function register<P extends PropertyDefinitions>(
  name: string,
  properties: P,
  paint: PaintRunner<P>
) {
  const input_properties = Reflect.ownKeys(properties);

  const InnerClass = class {
    static get inputProperties() {
      return input_properties;
    }

    paint?: PaintRunner<P>;
  };

  InnerClass.prototype.paint = paint;

  registerPaint(name, InnerClass);
}
