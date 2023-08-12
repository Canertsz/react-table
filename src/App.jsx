import Table from "./Table.jsx";
import { users } from "./users.js";

function App() {
    return (
      <div className="p-4">
          <Table
              head={[
                  {title: "name-surname", sortable: true},
                  {title: "e-mail"},
                  {title: "age", sortable: true},
                  {title: "actions", width: 150}
              ]}
              body={users.map(user => ([
                  user.fullName,
                  user.email,
                  user.age,
                  [
                      <button className="w-14 p-1 bg-amber-500 rounded text-black">edit</button>,
                      <button className="w-14 p-1 bg-red-500 rounded ml-2">delete</button>
                  ]
              ]))} />
      </div>
  )
}

export default App

// "name-surname", "e-mail", "age", "actions"