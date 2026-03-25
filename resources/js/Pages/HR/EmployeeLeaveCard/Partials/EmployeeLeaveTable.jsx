import React from "react";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const EmployeeLeaveTable = ({ employees }) => {
    const handleSelectEmployee = (employee) => {
        router.visit(
            route("employeeleavecard.show", {
                id: employee.id,
                name: employee.first_name.toLowerCase(),
            }),
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <div className="mt-6 max-w-5xl mx-auto overflow-x-auto border border-blue-400 rounded-lg shadow">
            <Table>
                <TableCaption>Employee Records</TableCaption>
                <TableHeader>
                    <TableRow className="bg-blue-900 hover:bg-blue-800">
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
                                onClick={() => handleSelectEmployee(emp)}
                            >
                                <TableCell className="font-medium text-gray-800">
                                    {emp.first_name} {emp.last_name}
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
                                colSpan={4}
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

export default EmployeeLeaveTable;
