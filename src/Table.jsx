import { useState } from "react";
import { FaSort, FaSortDown, FaSortUp} from "react-icons/fa"
import { useMediaQuery, useMediaQueries } from '@react-hook/media-query'
import TableMobile from "./TableMobile.jsx";
import Switcher from "./Switcher.jsx";
import {Formik, Field, Form, validateYupSchema} from "formik";
import { users } from "./users.js";
import * as Yup from 'yup';

export default function Table({ head, body, setUsers }) {

    const [search, setSearch] = useState("")
    const [isEditModeActive, setIsEditModeActive] = useState(false)
    const [sorting, setSorting] = useState(false)
    const isMobile = useMediaQuery('(max-width: 555px)')

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

    const addUserSchema = Yup.object().shape({
        name: Yup.string()
            .min(6, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Name and Surname is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        age: Yup.number().min(1).max(110).required('Age is required')
    });

    return (
        !isMobile ? (
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
                <Switcher isEditModeActive={isEditModeActive} setIsEditModeActive={setIsEditModeActive} />
                <div className=" mt-4 w-full border border-zinc-700 rounded">
                    <table className="w-full">
                        <thead>
                        <tr>
                            {head.map((h, key) => (
                                <th
                                    className="text-left text-sm font-semibold text-gray-400 p-3 border-solid border-b border-zinc-700"
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
                        {filteredData.map((items, trKey) => (
                            <tr className="group" key={trKey}>
                                {items.map((i, tdKey) => (
                                    <td className="p-3 text-white text-sm group-hover:bg-zinc-700" key={tdKey}>
                                        {Array.isArray(i) ? i : isEditModeActive ?
                                            <input className="text-white border border-zinc-600 p-1 bg-zinc-800 rounded" type="text" value={i}/> :i}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {filteredData.length === 0 && <div className="italic text-slate-400 m-5">We couldn't find any results for "{search}"</div>}
                        </tbody>
                    </table>
                </div>
                <h1 className="text-white font-semibold text-2xl mt-4">Add User</h1>
                <div>
                    <Formik
                        initialValues={{ name: "", email: "", age: "" }}
                        onSubmit={(values) => {
                            users.push({fullName: values.name, email: values.email, age: values.age})
                            setUsers([...users])
                            values.name = ""
                            values.email = ""
                            values.age = ""
                        }}
                        validationSchema={addUserSchema}
                    >
                        {({ errors, touched }) => (

                            // TODO: NEEDS REFACTOR

                            <Form>
                                <div>
                                    <div className="flex mt-4 gap-x-10">
                                        <div className="flex items-center">
                                            <h3 className="text-white">Name-Surname</h3>
                                            <span className="ml-2">
                                        <Field name="name" type="text"  className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none" />
                                    </span>
                                        </div>
                                        <div className="flex items-center">
                                            <h3 className="text-white">Email</h3>
                                            <span className="ml-2">
                                        <Field name="email" type="email" className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none" />

                                    </span>
                                        </div>
                                        <div className="flex items-center">
                                            <h3 className="text-white">Age</h3>
                                            <span className="ml-2">
                                        <Field name="age" type="text"  className="text-center bg-zinc-800 border border-zinc-600 rounded w-14 text-white p-2 outline-none" />

                                    </span>
                                        </div>
                                        <button type="submit" className="bg-orange-400 p-1 rounded w-16 h-9 my-auto">add</button>
                                    </div>
                                    {errors.name && touched.name ? (
                                        <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.name}</div>
                                    ) : null}
                                    {errors.age && touched.age ? (
                                        <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.age}</div>
                                    ) : null}
                                    {errors.email && touched.email ? (
                                        <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.email}</div>
                                    ) : null}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
        ) : <TableMobile head={head} filteredData={filteredData} search={search} setSearch={setSearch} sorting={sorting} setSorting={setSorting} setUsers={setUsers} />
    )
}