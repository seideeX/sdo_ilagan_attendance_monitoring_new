import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Search, Printer } from "lucide-react";
import FloatingInput from "@/components/floating-input";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";
import { Button } from "@/Components/ui/button";

import EmployeeTable from "./Partials/EmployeeTable";
import PrintDialog from "./Partials/PrintDialog"; // <-- import dialog

const Daily_Time_Record = ({ time_record }) => {
    const employees = time_record;
    const [search, setSearch] = useState("");
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedDepartment, setSelectedDepartment] =
        useState("All Departments");
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false); // dialog state

    const departments = [
        "All Departments",
        ...new Set(employees.map((emp) => emp.department)),
    ];

    const filteredEmployees = employees.filter((emp) => {
        const matchesDepartment =
            selectedDepartment === "All Departments"
                ? true
                : emp.department === selectedDepartment;

        const matchesSearch =
            emp.first_name.toLowerCase().includes(search.toLowerCase()) ||
            emp.last_name.toLowerCase().includes(search.toLowerCase()) ||
            (emp.position &&
                emp.position.toLowerCase().includes(search.toLowerCase())) ||
            (emp.department &&
                emp.department.toLowerCase().includes(search.toLowerCase()));

        return matchesDepartment && matchesSearch;
    });

    const handleSelectEmployee = (employee) => {
        router.visit(
            `/dailytimerecord/${
                employee.id
            }-${employee.first_name.toLowerCase()}`,
            { preserveState: true, preserveScroll: true }
        );
    };

    const selectedList = employees.filter((emp) => selectedEmployees[emp.id]);

    return (
        <AuthenticatedLayout header="Monthly Daily Time Record">
            <Head title="AMS" />
            <main className="p-6">
                {!selectedEmployeeId && (
                    <>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <FloatingInput
                                label="Search Employee"
                                icon={Search}
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <CustomDropdownCheckbox
                                label="Select Department"
                                items={departments}
                                selected={selectedDepartment}
                                onChange={setSelectedDepartment}
                                buttonVariant="green"
                            />
                            <Button
                                onClick={() => setDialogOpen(true)}
                                variant="blue"
                                disabled={selectedList.length === 0}
                                className="flex items-center gap-1 px-3 py-2"
                            >
                                <Printer className="w-4 h-4" />
                                Print Selected
                            </Button>
                        </div>

                        <EmployeeTable
                            employees={filteredEmployees}
                            onSelect={handleSelectEmployee}
                            selectedEmployees={selectedEmployees}
                            setSelectedEmployees={setSelectedEmployees}
                        />

                        <PrintDialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            selectedEmployees={selectedList}
                            attendances={selectedList.flatMap(
                                (emp) => emp.attendances || []
                            )}
                        />
                    </>
                )}
            </main>
        </AuthenticatedLayout>
    );
};

export default Daily_Time_Record;
