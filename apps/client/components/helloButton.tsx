'use client'

import apiCall from "@/utils/apiCall"
import { getSession, useSession } from "next-auth/react";

export default function HelloButton() {
    const { data: session } = useSession();
    return (
        <button onClick={() => {
        apiCall({
            url: '/hello',
            method: 'GET'
        }, session?.access_token)
        .then((res) => console.log(res))
        }
        }>
        hello
        </button>
    )
}

// Path: apps\client\components\helloButton.tsx