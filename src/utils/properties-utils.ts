export type IsStyleValue = { is_style_value: boolean };
export const IsStyleValue = { is_style_value: true };
export type IsUnitValue = { is_unit_value: boolean };
export const IsUnitValue = { is_unit_value: true };
export type IsKeywordValue = { is_keyword_value: boolean };
export const IsKeywordValue = { is_keyword_value: true };

export type PropertyDefinitions<K extends string = string> = {
  [key in K]: CSS.PropertyDefinition;
};

/**
 * support define properties, with typed-system.
 * @param input properties define.
 * @returns
 */
export function define_properties<
  P extends PropertyDefinitions<K>,
  K extends keyof P = keyof P
>(input: P): P {
  return input as P;
}

export function register_properties(input: PropertyDefinitions) {
  Object.keys(input).forEach((key) => {
    CSS.registerProperty(input[key]);
  });
}

// type AnalyzedProperty<
//   P extends PropertyDefinition<K>,
//   K extends keyof P = keyof P
// > = {
//   [key in Replace<TrimStart<K, "--">, "-", "_">]: P[K] extends IsStyleValue &
//     IsUnitValue
//     ? CSSProperty
//     : P[K] extends IsStyleValue
//     ? CSSStyleValue
//     : CSSUnitValue;
// }[Replace<TrimStart<K, "--">, "-", "_">];
// type AnalyzedProperties<
//   P extends PropertyDefinition<K>,
//   K extends keyof P = keyof P
// > = {
//   [key in Replace<TrimStart<K, "--">, "-", "_">]: AnalyzedProperty<P, K>;
// };
// export function analyze_properties<
//   P extends PropertyDefinition<K>,
//   M extends PropertyMap<P>,
//   K extends keyof P = keyof P
// >(properties: M): AnalyzedProperties<P> {
//   const result = {} as any;

//   (Reflect.ownKeys(properties) as (keyof P)[]).forEach((key) => {
//     const property_name = key.substr(2).replace(/-/g, "_");
//     const val = properties.get(key);
//     result[property_name] = {
//       source: val,
//       value: "value" in val ? val.value : val.toString(),
//     };
//   });

//   return result as AnalyzedProperties<P>;
// }
