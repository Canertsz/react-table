import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { users } from "./users.js";

export default function TableMobile({ head, filteredData, search, setSearch, sorting, setSorting, setUsers }) {

    const addUserSchema = Yup.object().shape({
        name: Yup.string()
            .min(6, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Name and Surname is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        age: Yup.number().min(1).max(110).required('Age is required')
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
            <div className="border border-zinc-700 rounded grid divide-y divide-zinc-700 gap-y-4 p-4 mt-4">
                {filteredData.map((items, key) => (
                    <section className="pt-4 first:pt-0">
                        {items.map((item, key) => (
                            <div className="text-sm text-white flex items-center gap-x-6">
                                <h6 className="min-w-[150px] text-xs font-semibold text-gray-300">
                                    {head[key].title === "actions" ? "" : head[key].title}
                                </h6>
                                {Array.isArray(item)
                                    ? <div className="flex mt-2">{item}</div>
                                    : item}
                            </div>
                        ))}
                    </section>
                ))}
                {filteredData.length === 0 && <div className="italic text-slate-400 m-2">We couldn't find any results for "{search}"</div>}

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
                            <div className="flex mt-4 gap-x-8">
                                <div className="flex flex-col gap-y-4 text-white">
                                    <span className="mt-2">Name-Surname</span>
                                    <span className="mt-5">Email</span>
                                    <span className="mt-4">Age</span>
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    <Field name="name" type="text"  className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none" />
                                    <Field name="email" type="email" className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none" />
                                    <Field name="age" type="text"  className="text-center bg-zinc-800 border border-zinc-600 rounded w-14 text-white p-2 outline-none" />
                                </div>
                            </div>
                            <button type="submit" className="bg-orange-400 p-1 rounded my-auto mt-8 w-16">add</button>
                            {errors.name && touched.name ? (
                                <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.name}</div>
                            ) : null}
                            {errors.age && touched.age ? (
                                <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.age}</div>
                            ) : null}
                            {errors.email && touched.email ? (
                                <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">{errors.email}</div>
                            ) : null}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}