'use client'

import apiCall from "@/utils/apiCall"

export default function HelloButton() {
    return (
        <button onClick={() => {
        apiCall({
            url: '/hello',
            method: 'GET'
        })
        .then((res) => console.log(res))
        }
        }>
        hello
        </button>
    )
}

// Path: apps\client\components\helloButton.tsx