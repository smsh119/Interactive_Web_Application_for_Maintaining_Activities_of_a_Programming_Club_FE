import http from "./httpService";

const apiEndPoint = "/gallery";

export function getPhotos() {
  return http.get(apiEndPoint);
}
export function addPhoto(photo) {
  return http.post(apiEndPoint, photo);
}
