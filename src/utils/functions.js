export default function getHandleNameFromUrl(url) {
  if (url === undefined || url === "" || url === "not provided")
    return "not provided";
  const arr = url.split("/");
  if (arr[arr.length - 1] === "") arr.pop();
  return arr[arr.length - 1];
}
