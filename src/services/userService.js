import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  const postObj = {
    sid: user.sid,
    email: user.email,
    password: user.password,
    isUpdated: user.isUpdated,
    profileId: "646fdb1eeb44a104d1d50ab2",
  };
  return http.post(apiEndPoint, postObj);
}
export function getAllUsers() {
  return http.get(apiEndPoint + "/list");
}

export function changeAdmin(obj) {
  return http.put(apiEndPoint, obj);
}

export function resetPassword(data) {
  return http.post(apiEndPoint + "/resetPassword", data);
}
export function changePassword(data) {
  return http.put(apiEndPoint + "/newpassword ", data);
}
