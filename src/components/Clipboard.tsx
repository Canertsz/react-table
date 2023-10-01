import { BsFillClipboardFill } from "react-icons/Bs"
import { useState } from "react"

interface ClipboardProps {
  i: string
}

export default function Clipboard({ i }: ClipboardProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const writeTextInClipboard = () => {
    navigator.clipboard.writeText(i).then(() => {
      setIsClicked(true)
    })
  }

  isClicked === true ? setTimeout(() => setIsClicked(false), 500) : null

  return (
    <BsFillClipboardFill
      style={{ cursor: "pointer" }}
      className={isClicked ? "transition-all text-green-400" : "transition-all"}
      onClick={writeTextInClipboard}
    />
  )
}
