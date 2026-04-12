import React, { useState, useEffect, useMemo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
import FloatingInput from "@/components/floating-input";

const AddDepartmentHeadForm = ({
    open,
    setOpen,
    employees = [],
    departments = [],
    preselectedDept = null,
}) => {
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState("");

    // ✅ Set department when opened
    useEffect(() => {
        if (open) {
            setSelectedDept(preselectedDept || "");
            setSelectedEmployee(null);
            setSearch("");
        }
    }, [open, preselectedDept]);

    // ✅ Get department name
    const deptName = departments.find((d) => d.id == selectedDept)?.name || "";

    // ✅ Filter employees by department + search
    const filteredEmployees = useMemo(() => {
        return employees
            .filter((emp) => emp.department_id == selectedDept)
            .filter((emp) =>
                `${emp.first_name} ${emp.last_name}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
            );
    }, [employees, selectedDept, search]);

    const handleSubmit = () => {
        if (!selectedEmployee) return;

        router.post(
            route("departmenthead.store"),
            {
                employee_id: selectedEmployee.id,
            },
            {
                onSuccess: () => setOpen(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Department Head</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* DEPARTMENT DISPLAY */}
                    <div className="mb-5">
                        <p className="text-sm text-gray-500 mb-2">
                            Department:
                        </p>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                            {deptName}
                        </span>
                    </div>

                    <FloatingInput
                        label="Search employee"
                        icon={Search}
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* EMPLOYEE LIST */}
                    <div className="border rounded-md h-[180px] overflow-y-auto divide-y divide-gray-100">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <div
                                    key={emp.id}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition ${
                                        selectedEmployee?.id === emp.id
                                            ? "bg-blue-50 border-l-4 border-blue-500"
                                            : ""
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                        {emp.first_name[0]}
                                        {emp.last_name[0]}
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <div className="text-sm font-medium">
                                            {emp.first_name} {emp.last_name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {emp.position}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500 text-center">
                                No employees found
                            </div>
                        )}
                    </div>

                    {/* FOOTER BUTTONS */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedEmployee}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Assign Head
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddDepartmentHeadForm;
