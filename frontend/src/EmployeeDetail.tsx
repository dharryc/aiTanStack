import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "./api";

export function EmployeeDetail({ id }: { id: string }) {
    const employeeQuery = useQuery({
        queryKey: ['employees', id],
        queryFn: () => getEmployee(id),
    })

    if (employeeQuery.isPending) {
        return <p>Loading...</p>
    }

    if (employeeQuery.isError) {
        return <p>Error: {employeeQuery.error.message}</p>
    }

    const employee = employeeQuery.data

    return (
        <section>
            <h2>{employee.name}</h2>
            <p>Role: {employee.role}</p>
            <p>Department: {employee.department}</p>
        </section>
    )
}