import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import EmployeeLeaveFilters from "./Partials/EmployeeLeaveFilters";
import EmployeeLeaveTable from "./Partials/EmployeeLeaveTable";

const EmployeeLeaveCard = ({ employees }) => {
    const [search, setSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] =
        useState("All Departments");

    const departments = useMemo(
        () => [
            "All Departments",
            ...Array.from(
                new Set(employees.map((emp) => emp.department).filter(Boolean))
            ),
        ],
        [employees]
    );

    const filteredEmployees = useMemo(
        () =>
            employees.filter((emp) => {
                const name = `${emp.first_name ?? ""} ${emp.last_name ?? ""}`;
                const matchesName = name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                const matchesDept =
                    selectedDepartment === "All Departments"
                        ? true
                        : emp.department === selectedDepartment;
                return matchesName && matchesDept;
            }),
        [employees, search, selectedDepartment]
    );

    return (
        <AuthenticatedLayout header="Employee's Leave Card">
            <Head title="Employee Leave Card" />
            <main className="p-6">
                <EmployeeLeaveFilters
                    search={search}
                    setSearch={setSearch}
                    departments={departments}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
                <EmployeeLeaveTable employees={filteredEmployees} />
            </main>
        </AuthenticatedLayout>
    );
};

export default EmployeeLeaveCard;
