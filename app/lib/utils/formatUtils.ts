export function capitalize(text: string): string {
  if (text.length > 0) {
    return text[0].toUpperCase() + text.slice(1);
  }
  return text;
}

export function fileSize(b: number) {
  var u = 0,
    s = 1024;
  while (b >= s || -b >= s) {
    b /= s;
    u++;
  }
  return (u ? b.toFixed(1) + " " : b) + " KMGTPEZY"[u] + "B";
}
