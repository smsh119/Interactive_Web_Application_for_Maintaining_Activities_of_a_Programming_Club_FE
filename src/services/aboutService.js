import http from "./httpService";

const apiEndPoint = "/about";

function urlWithId(id) {
  return `${apiEndPoint}/${id}`;
}

export function getInfo() {
  return http.get(apiEndPoint);
}

export function saveInfo(info) {
  if (info._id) {
    const body = { ...info };
    delete body._id;
    return http.put(urlWithId(info._id), body);
  }

  return http.post(apiEndPoint, info);
}
