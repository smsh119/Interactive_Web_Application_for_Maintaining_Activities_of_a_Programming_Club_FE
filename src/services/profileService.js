import axios from "axios";
import http from "./httpService";
const apiEndPoint = "/profiles";

function profileUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getProfiles() {
  return http.get(apiEndPoint);
}

export async function getProfile(id) {
  return await http.get(`/profiles/${id}`);
}

export async function saveProfile(profile) {
  if (profile._id) {
    const body = { ...profile };
    delete body._id;
    return http.put(profileUrl(profile._id), body);
  }

  const { data: jwt } = await http.post(apiEndPoint, profile);
  http.setJwt(jwt);
  localStorage.setItem("token", jwt);
}

export function deleteProfile(profileId) {
  return http.delete(profileUrl(profileId));
}

export function getUser() {
  return http.get("/users/me");
}

export function addProfilePicture(pic, id, picUrl) {
  if (picUrl) {
    return http.put(apiEndPoint + `/profilePicture/${id}`, pic);
  }
  return http.post(apiEndPoint + `/profilePicture/${id}`, pic);
}
