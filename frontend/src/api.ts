// LESSON STAGE 2: Add employee API functions here.
// API base: http://localhost:3001
// GET /employees, GET /employees/:id, POST /employees,
// PUT /employees/:id, DELETE /employees/:id
export async function getEmployees(searchTerm?: string): Promise<Employee[]> {
  if (searchTerm) {
    const employeeResponse = await fetch(
      `http://localhost:3001/employees?name:contains=${searchTerm}`,
    );
    if (!employeeResponse.ok) {
      throw Error("Something went wrong!");
    }
    return employeeResponse.json();
  }
  const employeeResponse = await fetch("http://localhost:3001/employees");
  if (!employeeResponse.ok) {
    throw Error("Something went wrong!");
  }
  return employeeResponse.json();
}

export async function getEmployee(id: string): Promise<Employee> {
  const employeeResponse = await fetch(`http://localhost:3001/employees/${id}`);
  if (!employeeResponse.ok) {
    throw Error("Something went wrong!");
  }
  return employeeResponse.json();
}

export async function createEmployee(
  employee: Omit<Employee, "id">,
): Promise<Employee> {
  const employeeResponse = await fetch("http://localhost:3001/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!employeeResponse.ok) {
    throw Error("Something went wrong!");
  }
  return employeeResponse.json();
}

export async function updateEmployee(
  id: string,
  employee: Omit<Employee, "id">,
): Promise<Employee> {
  const employeeResponse = await fetch(`http://localhost:3001/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!employeeResponse.ok) {
    throw Error("Something went wrong!");
  }
  return employeeResponse.json();
}

export async function deleteEmployee(id: string): Promise<void> {
  const employeeResponse = await fetch(`http://localhost:3001/employees/${id}`, {
    method: "DELETE",
  });
  if (!employeeResponse.ok) {
    throw Error("Something went wrong!");
  }
}

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
};
