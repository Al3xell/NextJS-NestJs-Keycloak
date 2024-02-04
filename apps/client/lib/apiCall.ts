import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./authOptions";

export interface Data {
    method: string;
    url: string;
    data?: any;
}

export default async function apiCall(data: Data) {
    const session = typeof window === "undefined" ? await getServerSession(authOptions) : await getSession()
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${data.url}`
    return await fetch(url, {
        method: data.method,
        body: JSON.stringify(data.data),
        headers: {
            Authorization: "Bearer " + session?.access_token,
            'Content-type': 'application/json',
            userInfo: JSON.stringify(session?.user),
        },
    });
} 