import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createEmployee, deleteEmployee, getEmployees, updateEmployee, type Employee } from "./api"
import { useState } from "react"
import { EmployeeDetail } from "./EmployeeDetail"

export function EmployeeList() {
    const [displayedEmployee, setDisplayedEmployee] = useState<string | null>("1")
    const [searchTerm, setSearchTerm] = useState("")
    const queryClient = useQueryClient()
    const employeeQuery = useQuery({
        queryKey: ['employees', {searchTerm}],
        queryFn: () => getEmployees(searchTerm),
        placeholderData: keepPreviousData,
    })
    const addEmployee = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
    const removeEmployee = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: (_data, deletedId) => {
            if (deletedId === displayedEmployee) {
                setDisplayedEmployee(null)
            }
            queryClient.removeQueries({ queryKey: ['employees', deletedId] })
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        },
    })
    const editEmployee = useMutation({
        mutationFn: ({ id, employee }: { id: string; employee: Omit<Employee, "id"> }) =>
            updateEmployee(id, employee),
        onSuccess: (updatedEmployee) => {
            queryClient.setQueryData(['employees', updatedEmployee.id], updatedEmployee)
            queryClient.invalidateQueries({
                queryKey: ['employees'],
                predicate: (query) => typeof query.queryKey[1] !== "string",
            })
        },
    })
    console.log(employeeQuery)

    if (employeeQuery.isPending) return (<p>Loading</p>)
    if (employeeQuery.isError) return (<p>I've learned from the best. Something has gone wrong, but good luck finding out what that is!</p>)
    return (
        <div>
            <button onClick={() => addEmployee.mutate({ name: "Temporary Employee", role: "Tester", department: "Engineering" })}>
                Add temporary employee
            </button>
            <label>Search by name:</label>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            {employeeQuery.data.map((e) => {
                return (
                    <div key={e.id}>
                        <p>{e.name}</p>
                        <button onClick={() => editEmployee.mutate({
                            id: e.id,
                            employee: { name: "Renamed Employee", role: e.role, department: e.department },
                        })}>Rename</button>
                        <button onClick={() => removeEmployee.mutate(e.id)}>Delete</button>
                        <button onClick={() => {setDisplayedEmployee(e.id)}}>Show more</button>
                    </div>
                )
            })}
            {displayedEmployee && <EmployeeDetail id={displayedEmployee}/>} 
        </div>
    )
}