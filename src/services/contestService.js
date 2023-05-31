import http from "./httpService";

const apiEndPoint = "/contests";

function contestUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getContests() {
  return http.get(apiEndPoint);
}
export function getContest(id) {
  return http.get(contestUrl(id));
}
export function addContest(contest) {
  return http.post(apiEndPoint, contest);
}
export function updateContest(contest) {
  return http.put(apiEndPoint + "/approve/" + contest._id, {
    isApproved: true,
  });
}
export function deleteContest(contestId) {
  return http.delete(contestUrl(contestId));
}
