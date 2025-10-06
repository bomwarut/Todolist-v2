import axios from "axios";

const Useapi: any = (url: string) =>
  axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });

export default Useapi;