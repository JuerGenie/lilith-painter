export function get_values(e: any): string[] {
  return Object.keys(e).map((key) => e[key]);
}
