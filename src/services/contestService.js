import http from "./httpService";

const apiEndPoint = "/contests";

function contestUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getContests() {
  return http.get(apiEndPoint);
}
export function addContest(contest) {
  return http.post(apiEndPoint, contest);
}
export function deleteContest(contestId) {
  return http.delete(contestUrl(contestId));
}
