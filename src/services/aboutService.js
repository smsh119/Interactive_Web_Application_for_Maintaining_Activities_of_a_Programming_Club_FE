import http from "./httpService";

const apiEndPoint = "/about";
export function getInfo() {
  return http.get(apiEndPoint);
}

export function saveInfo(info) {
  return http.post(apiEndPoint, info);
}
