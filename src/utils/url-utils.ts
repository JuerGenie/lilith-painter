export function get_current_path(source: string) {
  return source.substring(0, source.lastIndexOf("/"));
}

export async function get_text(url: string) {
  return await fetch(url).then((res) => res.text());
}
