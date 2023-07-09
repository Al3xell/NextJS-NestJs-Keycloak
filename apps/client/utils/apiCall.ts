import axios from "axios";
import { getSession } from "next-auth/react";

export interface Data {
    method: string;
    url: string;
    data?: any;
}

export default async function apiCall(data: Data) {
    const session = await getSession();
    return await axios({
        method: data.method,
        url: `${process.env.NEXT_PUBLIC_API_URL}${data.url}`,
        data: data.data,
        headers: {
            Authorization: "Bearer " + session?.access_token,
        },
    });
} 