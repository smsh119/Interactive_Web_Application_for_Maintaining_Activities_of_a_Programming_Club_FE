import http from "./httpService";

const apiEndPoint = "/gallery";

export function getPhotos() {
  return http.get(apiEndPoint);
}
export function addPhoto(photo) {
  return http.post(apiEndPoint, photo);
}

export function deletePhoto(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}
