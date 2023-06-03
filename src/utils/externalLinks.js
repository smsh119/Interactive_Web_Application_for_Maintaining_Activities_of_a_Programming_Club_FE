export default function getExternalUrl(url) {
  let x = url.substring(0, 8);
  let y = url.substring(0, 7);
  if (x == "https://") return url.substring(8);
  if (y == "http://") return url.substring(7);
  return url;
}
