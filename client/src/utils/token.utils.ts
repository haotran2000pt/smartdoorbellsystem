export function getAccessToken() {
  const token = window.localStorage.getItem("token");
  return token;
}
export function setAccessToken(token: string) {
  window.localStorage.setItem("token", token);
}
