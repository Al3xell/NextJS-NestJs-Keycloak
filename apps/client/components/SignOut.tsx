'use client'

import { signOut } from "next-auth/react"


export default function HelloButton() {
    return (
        <button onClick={() => {
            signOut();
        }}>
        signOut
        </button>
    )
}

// Path: apps\client\components\helloButton.tsx