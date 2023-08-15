import Table from "./Table.jsx";
import { users } from "./users.js";
import { useState } from "react";

// TODO [FEATURE] copy email when it's clicked
// TODO [BUG] when you delete all users, it shows 2 error at the same time
// TODO [BUG] empty add user fields after submit

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
                      <button className="w-14 p-1 border border-red-500 text-red-500 rounded" onClick={() => {
                          const tmpUsers = [...user]
                          tmpUsers.splice(key, 1)
                          setUsers(tmpUsers)
                      }}>delete</button>
                  ]
              ]))}
              setUsers={setUsers}
          />
          {user.length === 0 && <div className="text-black p-2 bg-amber-600 rounded mt-4">There are no users left! you can add one below</div>}
      </div>
  )
}

export default App