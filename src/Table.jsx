import { useState } from "react";
import { FaSort, FaSortDown, FaSortUp} from "react-icons/fa"

export default function Table({ head, body }) {

    const [search, setSearch] = useState("")
    const [sorting, setSorting] = useState(false)

    const filteredData = body.filter(
        items => items.some(i => i.toString().toLocaleLowerCase("TR").includes(search.toLocaleLowerCase("TR")))
    ).sort((a, b) => {
        if (sorting?.orderBy === "asc") {
            return a[sorting.key].toString().localeCompare(b[sorting.key])
        }
        if (sorting?.orderBy === "dsc") {
            return b[sorting.key].toString().localeCompare(a[sorting.key])
        }
    })

    return (
        <>
            <div className="flex gap-x-2 w-full">
                <input
                    value={search}
                    className="w-full rounded p-2 focus: outline-none bg-zinc-700 text-white"
                    type="text"
                    placeholder="search user" onChange={(e) => setSearch(e.target.value)}/>
                {sorting && (
                    <button className="h-10 w-36 rounded wihtespace-nowrap text-sm px-4 py-2 border border-zinc-500 text-red-400"
                            onClick={() => setSorting(false)}>
                        cancel sort
                    </button>
                )}
            </div>
            <div className=" mt-4 w-full border border-gray-500 rounded">
                <table className="w-full">
                    <thead>
                    <tr>
                        {head.map((h, key) => (
                            <th
                                className="text-left text-sm font-semibold text-gray-400 p-3 border-solid border-b border-gray-500"
                                key={key} width={h?.width}>
                                <div className="flex items-center">
                                    {h.title}
                                    {h.sortable &&
                                     <button className="ml-1" onClick={() => {
                                         setSorting({key, orderBy: sorting.orderBy === "asc" ? "dsc" : "asc"})}
                                     }>
                                         {sorting?.key === key && (
                                             sorting.orderBy === "asc" ? <FaSortDown /> : <FaSortUp />
                                         )}
                                         {sorting?.key !== key && <FaSort />}
                                    </button>}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((items, key) => (
                        <tr className="group" key={key}>
                            {items.map((i, key) => (
                                <td className="p-3 text-white text-sm group-hover:bg-zinc-700" key={key}>
                                    {Array.isArray(i)
                                        ? <div className="flex">{i}</div>
                                        : i}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}