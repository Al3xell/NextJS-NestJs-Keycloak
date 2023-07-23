'use client'

import apiCall from "@/app/lib/apiCall"

export default function HelloButton() {
    return (
        <button type="button" onClick={() => {
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