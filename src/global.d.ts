type TrimStart<K extends string, P extends string> = K extends `${P}${infer R}`
  ? TrimStart<R, P>
  : K;

type Replace<K extends string, S extends string, T extends string> =
  K extends `${infer L}${S}${infer R}` ? Replace<`${L}${T}${R}`, S, T> : K;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
