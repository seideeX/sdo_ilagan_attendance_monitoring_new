import React, { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Printer } from "lucide-react";
import DTRFilters from "./DTRFilters";
import DTRReport from "@/Pages/DocumentsFormats/DtrReport";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";
import axios from "axios";

const PrintDialog = ({ open, onClose, selectedEmployees = [] }) => {
    const currentMonth = dayjs().format("MM");
    const currentYear = dayjs().format("YYYY");

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isGenerating, setIsGenerating] = useState(false);
    const [employeeData, setEmployeeData] = useState({}); // Store fetched employee data

    const pdfRefs = useRef({});

    useEffect(() => {
        selectedEmployees.forEach((emp) => {
            if (!employeeData[emp.id]) {
                axios
                    .get(`/dailytimerecord/details/${emp.id}`)
                    .then((res) => {
                        setEmployeeData((prev) => ({
                            ...prev,
                            [emp.id]: res.data,
                        }));
                    })
                    .catch((err) => console.error(err));
            }
        });
    }, [selectedEmployees]);

    // Flatten all attendances to determine month/year options
    const allAttendances = Object.values(employeeData).flatMap(
        (data) => data.time_record.attendances || []
    );

    const monthOptions = Array.from(
        new Set(allAttendances.map((att) => dayjs(att.date).format("MM")))
    ).sort();

    const yearOptions = Array.from(
        new Set(allAttendances.map((att) => dayjs(att.date).format("YYYY")))
    ).sort((a, b) => Number(b) - Number(a));

    const monthNames = monthOptions.length
        ? monthOptions.map((m) => ({
              value: m,
              label: dayjs(`${m}-01`, "MM-DD").format("MMMM"),
          }))
        : Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1).padStart(2, "0"),
              label: dayjs(`${i + 1}-01`, "MM-DD").format("MMMM"),
          }));

    const yearNames = yearOptions.length ? yearOptions : [currentYear];

    const generateLogs = (timeRecord) => {
        const attendances = timeRecord.attendances || [];
        const start = dayjs(`${selectedYear}-${selectedMonth}-01`).startOf(
            "month"
        );
        const end = dayjs(`${selectedYear}-${selectedMonth}-01`).endOf("month");
        const days = [];
        let current = start;
        while (current.isBefore(end) || current.isSame(end, "day")) {
            days.push(current);
            current = current.add(1, "day");
        }

        return days.map((date) => {
            const att = attendances.find((a) =>
                dayjs(a.date).isSame(date, "day")
            );
            return {
                date: date.format("YYYY-MM-DD"),
                amIn: att?.am?.am_time_in || "-",
                amOut: att?.am?.am_time_out || "-",
                pmIn: att?.pm?.pm_time_in || "-",
                pmOut: att?.pm?.pm_time_out || "-",
                undertime: att?.tardiness_record?.converted_tardy || "-",
            };
        });
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        for (const emp of selectedEmployees) {
            const element = pdfRefs.current[emp.id];
            if (!element) continue;

            await new Promise((res) => setTimeout(res, 50));

            await html2pdf()
                .set({
                    margin: 0.5,
                    filename: `DTR_${emp.full_name.replace(
                        /\s+/g,
                        "_"
                    )}_${selectedYear}-${selectedMonth}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: {
                        unit: "in",
                        format: "letter",
                        orientation: "portrait",
                    },
                })
                .from(element)
                .save();
        }
        setIsGenerating(false);
        onClose();
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Download DTR for Selected Employees
                    </DialogTitle>
                    <DialogDescription>
                        Generate PDFs for the selected employees.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 flex justify-start gap-2">
                    <DTRFilters
                        monthNames={monthNames}
                        yearOptions={yearNames}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        onDownloadPDF={handleDownloadPDF}
                        showDownload={false}
                    />
                </div>

                <div className="mt-4 max-h-64 overflow-y-auto border border-gray-300 p-2 rounded">
                    {selectedEmployees.length ? (
                        selectedEmployees.map((emp) => (
                            <div
                                key={emp.id}
                                className="p-2 border-b border-gray-200 last:border-b-0"
                            >
                                <strong>{emp.full_name}</strong> -{" "}
                                {emp.department || "—"} - {emp.position || "—"}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No employees selected.</p>
                    )}
                </div>

                {/* Hidden DTRReports for PDF */}
                <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                    {selectedEmployees.map((emp) => {
                        const empData = employeeData[emp.id];
                        if (!empData) return null;
                        const logs = generateLogs(empData.time_record);
                        return (
                            <DTRReport
                                key={emp.id}
                                ref={(el) => (pdfRefs.current[emp.id] = el)}
                                name={emp.full_name}
                                dateRange={{
                                    start: dayjs(
                                        `${selectedYear}-${selectedMonth}-01`
                                    )
                                        .startOf("month")
                                        .format("YYYY-MM-DD"),
                                    end: dayjs(
                                        `${selectedYear}-${selectedMonth}-01`
                                    )
                                        .endOf("month")
                                        .format("YYYY-MM-DD"),
                                }}
                                logs={logs}
                                monthlyTotals={empData.monthly_totals}
                            />
                        );
                    })}
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isGenerating}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="blue"
                        onClick={handleDownloadPDF}
                        disabled={!selectedEmployees.length || isGenerating}
                    >
                        <Printer className="w-4 h-4 mr-1" />{" "}
                        {isGenerating ? "Generating..." : "Print"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PrintDialog;
