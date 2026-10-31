import { useState } from "react";
import { EmployeeList } from "./EmployeeList";

export default function App() {
  const [toggleBoolean, setToggleBoolean] = useState(true)

  return (
    <main>
      <button onClick={() => setToggleBoolean(!toggleBoolean)}>Toggle list</button>
      {toggleBoolean && <EmployeeList />}
    </main>
  )
}
