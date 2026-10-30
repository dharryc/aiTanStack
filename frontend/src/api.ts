// LESSON STAGE 2: Add employee API functions here.
// API base: http://localhost:3001
// GET /employees, GET /employees/:id, POST /employees,
// PUT /employees/:id, DELETE /employees/:id
export async function getEmployees(): Promise<Employee[]>{
  const employeeResponse = await fetch('http://localhost:3001/employees')
  if(!employeeResponse.ok){
    throw Error("Something went wrong!")
  }
  return employeeResponse.json()
}

export type Employee = {
  id: string
  name: string
  role: string
  department: string
}
