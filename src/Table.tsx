import { useState } from "react"
import { users } from "./users.js"
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa"
import { Formik, Field, Form } from "formik"
import { useMediaQuery } from "@react-hook/media-query"
import TableMobile from "./TableMobile.jsx"
import Switcher from "./components/Switcher.tsx"
import Clipboard from "./components/Clipboard.tsx"
import * as Yup from "yup"
import {
  TableHeader,
  TableBody,
  UsersType,
  AddUserSchema,
  SortingState,
} from "./types.ts"

interface TableProps {
  head: TableHeader[]
  body: TableBody[] | null
  setUsers: React.Dispatch<React.SetStateAction<UsersType[] | null>>
}

export default function Table({
  head,
  body,
  setUsers,
}: TableProps): JSX.Element {
  const [search, setSearch] = useState<string | number>("")
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortingState>({
    key: null,
    orderBy: null,
  })
  const isMobile = useMediaQuery("(max-width: 555px)")

  const filteredData = body
    ? body
        .filter((items) =>
          items.some((i) =>
            i
              .toString()
              .toLocaleLowerCase("TR")
              .includes(
                typeof search === "number"
                  ? search.toString().toLocaleLowerCase("TR")
                  : search.toLocaleLowerCase("TR"),
              ),
          ),
        )
        .sort((a: any, b: any) => {
          console.log(a, b)
          if (sorting.key !== null) {
            if (sorting.orderBy === "asc") {
              return a[sorting.key].toString().localeCompare(b[sorting.key])
            }
            if (sorting.orderBy === "dsc") {
              return b[sorting.key].toString().localeCompare(a[sorting.key])
            }
          }
          return 0
        })
    : []

  const addUserSchema: Yup.ObjectSchema<AddUserSchema> = Yup.object().shape({
    name: Yup.string()
      .min(6, "Too Short!")
      .max(16, "Too Long!")
      .required("Name and Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number().min(1).max(110).required("Age is required"),
  })

  return !isMobile ? (
    <>
      <div className="flex gap-x-2 w-full">
        <input
          value={search}
          className="w-full rounded p-2 focus: outline-none bg-zinc-700 text-white"
          type="text"
          placeholder="search user"
          onChange={(e) => setSearch(e.target.value)}
        />
        {sorting.key !== null && (
          <button
            className="h-10 w-36 rounded wihtespace-nowrap text-sm px-4 py-2 border border-zinc-500 text-red-400"
            onClick={() => setSorting({ key: null, orderBy: null })}
          >
            cancel sort
          </button>
        )}
      </div>
      <Switcher
        isEditModeActive={isEditModeActive}
        setIsEditModeActive={setIsEditModeActive}
      />
      <div className=" mt-4 w-full border border-zinc-700 rounded">
        <table className="w-full">
          <thead>
            <tr>
              {head.map((h, key) => (
                <th
                  className="text-left text-sm font-semibold text-gray-400 p-3 border-solid border-b border-zinc-700"
                  key={key}
                  style={{ width: h.width }}
                >
                  <div className="flex items-center">
                    {h.title}
                    {h.sortable && (
                      <button
                        className="ml-1"
                        onClick={() => {
                          setSorting({
                            key,
                            orderBy: sorting.orderBy === "asc" ? "dsc" : "asc",
                          })
                        }}
                      >
                        {sorting.key !== null &&
                          sorting.key === key &&
                          (sorting.orderBy === "asc" ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          ))}
                        {sorting && sorting?.key !== key && <FaSort />}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((items, trKey) => (
              <tr className="group" key={trKey}>
                {items.map((i, tdKey) => (
                  <td
                    className="p-3 text-white text-sm group-hover:bg-zinc-700"
                    key={tdKey}
                  >
                    {Array.isArray(i) ? (
                      i
                    ) : isEditModeActive ? (
                      typeof i === "string" && i.includes("@") ? (
                        <div className="flex items-center">
                          <input
                            className="text-white border border-zinc-600 p-1 bg-zinc-800 rounded mr-2"
                            type="text"
                            value={i}
                          />
                          <Clipboard i={i} />
                        </div>
                      ) : (
                        <input
                          className="text-white border border-zinc-600 p-1 bg-zinc-800 rounded"
                          type="text"
                          value={i as string | number}
                        />
                      )
                    ) : typeof i === "string" && i.includes("@") ? (
                      <div className="flex items-center">
                        <span className="mr-2">{i}</span>
                        <Clipboard i={i} />
                      </div>
                    ) : (
                      i
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <div className="italic text-slate-400 m-5">
                We couldn't find any results for "{search}"
              </div>
            )}
          </tbody>
        </table>
      </div>
      <h1 className="text-white font-semibold text-2xl mt-4">Add User</h1>
      <div>
        <Formik
          initialValues={{ name: "", email: "", age: "" }}
          onSubmit={(values) => {
            // Check
            const isNameExist = users.map((e) => e.fullName === values.name)
            const isEmailExist = users.map((e) => e.email === values.email)

            isNameExist.includes(true) || isEmailExist.includes(true)
              ? alert(
                  `${
                    isNameExist.includes(true) && isEmailExist.includes(true)
                      ? "Name And Email"
                      : isNameExist.includes(true)
                      ? "Name"
                      : "Email"
                  } already exist!`,
                )
              : users.push({
                  fullName: values.name,
                  email: values.email,
                  age: +values.age,
                })

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
                      <Field
                        name="name"
                        type="text"
                        className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none"
                        autocomplete="off"
                      />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-white">Email</h3>
                    <span className="ml-2">
                      <Field
                        name="email"
                        type="email"
                        className="bg-zinc-800 border border-zinc-600 rounded text-white p-2 outline-none"
                        autocomplete="off"
                      />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-white">Age</h3>
                    <span className="ml-2">
                      <Field
                        name="age"
                        type="text"
                        className="text-center bg-zinc-800 border border-zinc-600 rounded w-14 text-white p-2 outline-none"
                        autocomplete="off"
                      />
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-400 p-1 rounded w-16 h-9 my-auto"
                  >
                    add
                  </button>
                </div>
                {errors.name && touched.name ? (
                  <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">
                    {errors.name}
                  </div>
                ) : null}
                {errors.age && touched.age ? (
                  <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">
                    {errors.age}
                  </div>
                ) : null}
                {errors.email && touched.email ? (
                  <div className="text-white bg-red-500 w-full p-3 mt-4 opacity-90 rounded">
                    {errors.email}
                  </div>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  ) : (
    <TableMobile
      head={head}
      filteredData={filteredData}
      search={search}
      setSearch={setSearch}
      sorting={sorting}
      setSorting={setSorting}
      setUsers={setUsers}
      isEditModeActive={isEditModeActive}
      setIsEditModeActive={setIsEditModeActive}
    />
  )
}
