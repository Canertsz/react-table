import Table from "./Table.tsx"
import { users } from "./users.ts"
import { useState } from "react"
import { UsersType } from "./types.ts"

function App(): JSX.Element {
  const [user, setUsers] = useState<UsersType[] | null>(users)

  return (
    <div className="p-4">
      <Table
        head={[
          { title: "name-surname", sortable: true },
          { title: "e-mail" },
          { title: "age", sortable: true },
          { title: "actions", width: 150 },
        ]}
        body={
          user &&
          user.map((u, key) => [
            u.fullName,
            u.email,
            u.age,
            <button
              className="w-14 p-1 border border-red-500 text-red-500 rounded"
              onClick={(): void => {
                const tmpUsers = [...user]
                tmpUsers.splice(key, 1)
                setUsers(tmpUsers)
              }}
            >
              delete
            </button>,
          ])
        }
        setUsers={setUsers}
      />
      {user && user.length === 0 && (
        <div className="text-black p-2 bg-amber-600 rounded mt-4">
          There are no users left! you can add one below
        </div>
      )}
    </div>
  )
}

export default App
