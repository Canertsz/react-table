import Table from "./Table.jsx";
import { users } from "./users.js";
import { useState } from "react";

// TODO, Edit user
// TODO, Add user(form built with formik)
// TODO, copy email when clicked

function App() {

    const [user, setUsers] = useState(users)

    return (
      <div className="p-4">
          <Table
              head={[
                  {title: "name-surname", sortable: true},
                  {title: "e-mail"},
                  {title: "age", sortable: true},
                  {title: "actions", width: 150}
              ]}
              body={user.map((u, key) => ([
                  u.fullName,
                  u.email,
                  u.age,
                  [
                      <button className="w-14 p-1 bg-amber-500 rounded text-black">edit</button>,
                      <button className="w-14 p-1 bg-red-500 rounded ml-2" onClick={() => {
                          const tmpUsers = [...user]
                          tmpUsers.splice(key, 1)
                          setUsers(tmpUsers)
                      }}>delete</button>
                  ]
              ]))} />
          {user.length === 0 && <div className="text-black p-2 bg-amber-600 rounded mt-4">no users found</div>}
      </div>
  )
}

export default App

// "name-surname", "e-mail", "age", "actions"