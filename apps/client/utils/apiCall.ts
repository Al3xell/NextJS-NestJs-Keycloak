import axios from "axios";

export interface Data {
    method: string;
    url: string;
    data?: any;
}

export default async function apiCall(data: Data, access_token: string | undefined) {
    return await axios({
        method: data.method,
        url: `${process.env.NEXT_PUBLIC_API_URL}${data.url}`,
        data: data.data,
        headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
} 