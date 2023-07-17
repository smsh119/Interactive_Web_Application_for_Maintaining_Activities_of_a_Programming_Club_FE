export default function getFileUrl(url) {
  return import.meta.env.VITE_REACT_APP_API_URL + url;
}
