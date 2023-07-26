import http from "./httpService";

const apiEndPoint = "/resources";

export function getPosts() {
  return http.get(apiEndPoint + "/posts");
}

export function getPost(id) {
  return http.get(apiEndPoint + "/posts/" + id);
}

export function addPost(post) {
  return http.post(apiEndPoint + "/post", post);
}
export function deletePost(id) {
  return http.delete(apiEndPoint + "/post/" + id);
}
export function getFiles() {
  return http.get(apiEndPoint + "/files");
}
export function addFile(file) {
  return http.post(apiEndPoint + "/file", file);
}
export function deleteFile(id) {
  return http.delete(apiEndPoint + "/file/" + id);
}
