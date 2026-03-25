import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DTRTable = ({
    logs,
    timeRecord,
    undertimeTotal,
    selectedMonth,
    selectedYear,
}) => {
    return (
        <div className="bg-blue-100 shadow overflow-hidden sm:rounded-lg p-6">
            {selectedMonth && selectedYear ? (
                <Table>
                    <TableCaption>
                        Attendance for {timeRecord.first_name}{" "}
                        {timeRecord.last_name} on{" "}
                        {new Date(
                            `${selectedYear}-${selectedMonth}-01`
                        ).toLocaleString("default", { month: "long" })}{" "}
                        {selectedYear}
                    </TableCaption>

                    <TableHeader>
                        <TableRow className="bg-blue-900 hover:bg-blue-800">
                            {[
                                "Date",
                                "AM In",
                                "AM Out",
                                "PM In",
                                "PM Out",
                                "Undertime",
                            ].map((head) => (
                                <TableHead
                                    key={head}
                                    className="text-white text-center"
                                >
                                    {head}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.date}>
                                <TableCell className="text-center">
                                    {log.date}
                                </TableCell>

                                {log.isLeave ? (
                                    <>
                                        <TableCell
                                            className="text-center font-bold"
                                            colSpan={4}
                                        >
                                            {log.leave_type === "VL"
                                                ? "Vacation Leave"
                                                : log.leave_type === "SL"
                                                ? "Sick Leave"
                                                : log.leave_type === "OB"
                                                ? "Official Business"
                                                : log.leave_type}
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell className="text-center">
                                            {log.amIn}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {log.amOut}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {log.pmIn}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {log.pmOut}
                                        </TableCell>
                                    </>
                                )}

                                {/* Undertime column always separate */}
                                <TableCell className="text-center">
                                    {log.isLeave ? " " : log.undertime}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow className="font-bold bg-blue-900 hover:bg-blue-800">
                            <TableCell className="text-center text-white">
                                Total
                            </TableCell>
                            <TableCell colSpan={4}></TableCell>
                            <TableCell className="text-center text-white">
                                {undertimeTotal.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ) : (
                <p className="text-gray-600">
                    Please select a month and year to view attendance.
                </p>
            )}
        </div>
    );
};

export default DTRTable;
