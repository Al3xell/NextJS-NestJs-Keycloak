import axios from "axios";

export interface Data {
    method: string;
    url: string;
    data: any;
}

export default function apiCall(data: Data, access_token: string) {
    return axios({
        method: data.method,
        url: data.url,
        data: data.data,
        headers: {
        Authorization: "Bearer " + access_token,
        },
    });
}