export default function getHandleNameFromUrl(url) {
  const arr = url.split("/");
  if (arr[arr.length - 1] === "") arr.pop();
  return arr[arr.length - 1];
}
