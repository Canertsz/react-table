import { BsFillClipboardFill } from "react-icons/Bs"

export default function Clipboard({ i }) {

    const writeTextInClipboard = () => {
        navigator.clipboard.writeText(i)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <BsFillClipboardFill style={{cursor: "pointer"}} onClick={writeTextInClipboard} />
    )
}