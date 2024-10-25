import axios from "axios";

export const BaseApi = axios.create({
  baseURL: "http://10.0.2.2:3000",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});
