import http from "./httpService";

const apiEndPoint = "/resources";

export function getPosts() {
  return http.get(apiEndPoint + "/posts");
}

export function getPost(id) {
  return http.get(apiEndPoint + "/posts/" + id);
}

export function addPost(post) {
  const id = post._id;
  delete post._id;
  if (id === null) return http.post(apiEndPoint + "/post", post);
  return editPost(id, post);
}
function editPost(id, post) {
  return http.put(apiEndPoint + "/post/" + id, post);
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
