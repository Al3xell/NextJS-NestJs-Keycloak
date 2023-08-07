'use client'

import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Navbar() {
    return (
        <nav className="h-[90vh] m-4 flex flex-col gap-4">
            <FontAwesomeIcon icon={faHouse} />
        </nav>
    )
}