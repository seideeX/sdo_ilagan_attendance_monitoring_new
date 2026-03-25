import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const LeaveTable = ({ filteredLeaves }) => {
    return (
        <div className="overflow-x-auto mt-3">
            <Table className="w-full text-sm border border-gray-300">
                <TableHeader>
                    <TableRow className="bg-blue-900 hover:bg-blue-800">
                        <TableHead rowSpan={2} className="text-center">
                            Period
                        </TableHead>
                        <TableHead rowSpan={2} className="text-center">
                            Particulars
                        </TableHead>
                        <TableHead colSpan={4} className="text-center">
                            Vacation Leave
                        </TableHead>
                        <TableHead colSpan={4} className="text-center">
                            Sick Leave
                        </TableHead>
                    </TableRow>
                    <TableRow className="bg-blue-900 hover:bg-blue-800">
                        {[
                            "Earned",
                            "Undertime W/ Pay",
                            "Balance",
                            "Undertime W/o Pay",
                            "Earned",
                            "Undertime W/ Pay",
                            "Balance",
                            "Undertime W/o Pay",
                        ].map((h, i) => (
                            <TableHead key={i} className="text-center">
                                {h}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredLeaves.map((leave, i) => {
                        const vl = leave.vacation || {};
                        const sl = leave.sick || {};
                        return (
                            <TableRow key={i} className="text-center">
                                <TableCell>{leave.period?.period}</TableCell>
                                <TableCell>
                                    {leave.period?.particulars || "—"}
                                </TableCell>

                                {[
                                    vl.earned,
                                    vl.used_wpay,
                                    vl.balance,
                                    vl.used_wopay,
                                    sl.earned,
                                    sl.used_wpay,
                                    sl.balance,
                                    sl.used_wopay,
                                ].map((val, idx) => (
                                    <TableCell key={idx}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span className="cursor-pointer">
                                                        {val || 0}
                                                    </span>
                                                </TooltipTrigger>
                                                {(vl.remarks || sl.remarks) && (
                                                    <TooltipContent>
                                                        <p>
                                                            {vl.remarks ||
                                                                sl.remarks}
                                                        </p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeaveTable;
