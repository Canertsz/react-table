import { BsFillClipboardFill } from "react-icons/Bs"
import { useState } from "react";

export default function Clipboard({ i }) {

    const [isClicked, setIsClicked] = useState(false)

    const writeTextInClipboard = () => {
        navigator.clipboard.writeText(i)
            .then(() => {
                setIsClicked(true)
            })

    };

    isClicked === true ? setTimeout(() => setIsClicked(false), 500) : null

    return (
        <BsFillClipboardFill
            style={{cursor: "pointer"}}
            className={isClicked ? "transition-all text-green-400" : "transition-all"}
            onClick={writeTextInClipboard} />
    )
}