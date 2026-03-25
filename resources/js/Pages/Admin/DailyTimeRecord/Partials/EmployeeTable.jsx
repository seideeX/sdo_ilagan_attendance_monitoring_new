import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const EmployeeTable = ({
    employees,
    onSelect,
    selectedEmployees,
    setSelectedEmployees,
}) => {
    const [selectedAll, setSelectedAll] = useState(false);

    const toggleSelectAll = () => {
        const newValue = !selectedAll;
        setSelectedAll(newValue);

        const newSelected = {};
        if (newValue) {
            employees.forEach((emp) => {
                newSelected[emp.id] = true;
            });
        }
        setSelectedEmployees(newSelected);
    };

    const toggleSelectEmployee = (id) => {
        setSelectedEmployees((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="mt-6 max-w-5xl mx-auto overflow-x-auto border border-blue-400 rounded-lg shadow">
            <Table>
                <TableCaption>Employee Records</TableCaption>
                <TableHeader>
                    <TableRow className="bg-blue-900 hover:bg-blue-800">
                        <TableHead>
                            <Checkbox
                                checked={selectedAll}
                                onCheckedChange={toggleSelectAll}
                                className="bg-blue-500 hover:bg-blue-800"
                            />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Work Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <TableRow
                                key={emp.id}
                                className="hover:bg-blue-50 cursor-pointer transition"
                                onClick={() => onSelect(emp)}
                            >
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={!!selectedEmployees[emp.id]}
                                        onCheckedChange={() =>
                                            toggleSelectEmployee(emp.id)
                                        }
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-gray-800">
                                    {emp.full_name}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {emp.position || "—"}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {emp.department || "—"}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {emp.work_type || "—"}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center text-gray-500 py-6"
                            >
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeTable;
