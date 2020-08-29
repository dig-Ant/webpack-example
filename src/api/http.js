import axios from "axios";

let host = "http://localhost:3001";

if (!IS_DEV) {
	host = "https://www.itheima.com";
}

const apiUrl = `${host}/api/getUserInfo`;

export const getUserInfo = () => axios.get(apiUrl);
