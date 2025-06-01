import init from "requests/init";
import { request } from "requests/request";
import { LoginType, SignUpType } from "types/request.dto";

const auth = {
  login: async (data: LoginType) =>
    //request.post('/token/login', data)
    ({ data: { auth_token: "helloooo" } }),
  signup: async (data: SignUpType) =>
    //  request.post("/auth/users/", data)
    ({ data: { auth_token: "helloooo" } }),
  logout: () =>
    init
      .post("/token/logout")
      .then((res) => console.log(res))
      .catch((err) => console.error(err)),
};
export default auth;
