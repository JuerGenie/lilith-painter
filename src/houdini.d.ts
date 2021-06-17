declare namespace CSS {
  export type PropertyDefinition = {
    name: string;
    syntax?: string;
    inherits: boolean;
    initialValue?: string;
  };
  export function registerProperty(definition: PropertyDefinition): void;

  interface PaintWorklet {
    devicePixelRatio: number;

    registerPaint(name: string, factory: typeof Worklet): void;
    addModule(moduleUrl: string, options?: Request): Promise<void>;
  }

  export const paintWorklet: PaintWorklet;
}

type CSSUnit = "em" | "px" | "rem" | "deg" | "percent";
declare interface CSSUnitValue<Unit extends CSSUnit = CSSUnit> {
  value: number;
  unit: Unit;
}
declare interface CSSKeywordValue {
  value: string;
  toString(): string;
}
declare interface CSSStyleValue {
  toString(): string;
}
declare var CSSUnitValue: {
  new <T extends CSSUnit = CSSUnit>(value: number, unit: T): CSSUnitValue<T>;
};
declare type CSSProperty = CSSUnitValue | CSSStyleValue | CSSKeywordValue;
declare type CSS = {
  [key in CSSUnit]: (value: number) => CSSUnitValue<key>;
};

declare function registerPaint(name: string, clz: Function): void;

type PaintFunc =
  | "arc"
  | "arcTo"
  | "beginPath"
  | "bezierCurveTo"
  | "clearRect"
  | "clip"
  | "closePath"
  | "createLinearGradient"
  | "createPattern"
  | "drawImage"
  | "ellipse"
  | "fill"
  | "fillRect"
  | "fillStyle"
  | "filter"
  | "getLineDash"
  | "getTransform"
  | "globalAlpha"
  | "globalCompositeOperation"
  | "imageSmoothingEnabled"
  | "isPointInPath"
  | "isPointInStroke"
  | "lineCap"
  | "lineDashOffset"
  | "lineJoin"
  | "lineTo"
  | "lineWidth"
  | "miterLimit"
  | "moveTo"
  | "quadraticCurveTo"
  | "rect"
  | "resetTransform"
  | "restore"
  | "rotate"
  | "save"
  | "scale"
  | "setLineDash"
  | "setTransform"
  | "shadowBlur"
  | "shadowColor"
  | "shadowOffsetX"
  | "shadowOffsetY"
  | "stroke"
  | "strokeRect"
  | "strokeStyle"
  | "transform"
  | "translate";

// declare type PaintRenderingContext2D = typeof PaintRenderingContext2D;
declare type PaintRenderingContext2D = {
  [key in PaintFunc]: CanvasRenderingContext2D[key];
};
// declare interface PaintRenderingContext2D extends CanvasRenderingContext2D {}
declare var PaintRenderingContext2D: {
  prototype: PaintRenderingContext2D;
  new (): PaintRenderingContext2D;
};
// declare class PaintRenderingContext2D implements PaintRenderingContext2D {}

type ReadonlyPropertyMap<
  K extends string | number | symbol = string,
  V extends CSSProperty = CSSProperty
> = {
  get(key: K): V;
  getAll(key: K): V[];
  has(key: K): boolean;
  size: number;
};

declare interface StylePropertyMap {
  size: number;
  append(property: string, value: string | CSSProperty): void;
  clear(): void;
  delete(property: string): void;
  set(property: string, value: string | CSSProperty): void;
}

declare interface HTMLElement {
  attributeStyleMap: StylePropertyMap;
}
