import http from "./httpService";

const apiEndPoint = "/notices";

function noticeUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getNotices() {
  return http.get(apiEndPoint);
}
export function addNotice(notice) {
  return http.post(apiEndPoint, notice);
}
export function deleteNotice(noticeId) {
  return http.delete(noticeUrl(noticeId));
}
