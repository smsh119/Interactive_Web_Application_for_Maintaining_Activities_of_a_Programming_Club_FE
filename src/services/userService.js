import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    sid: user.sid,
    email: user.email,
    password: user.password,
  });
}
