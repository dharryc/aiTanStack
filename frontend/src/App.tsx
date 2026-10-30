import { useQuery } from "@tanstack/react-query"
import { getEmployees } from "./api"

export default function App() {
  const employeeQuery = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees
  })

  console.log(employeeQuery)

  if (employeeQuery.isPending) return (<p>Loading</p>)
  if (employeeQuery.isError) return (<p>I've learned from the best. Something has gone wrong, but good luck finding out what that is!</p>)
  return (
    <main>
      {employeeQuery.data.map((e) => <p key={e.id}>{e.name}</p>)}
    </main>
  )
}
