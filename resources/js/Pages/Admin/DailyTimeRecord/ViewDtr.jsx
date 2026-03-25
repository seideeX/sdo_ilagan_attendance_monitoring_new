import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import html2pdf from "html2pdf.js";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/Components/ui/button";
import DTRFilters from "./Partials/DTRFilters";
import DTRTable from "./Partials/DTRTable";
import DTRReport from "@/Pages/DocumentsFormats/DtrReport";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const ViewDtr = ({ time_record, monthly_totals, employee_leaves }) => {
    const pdfRef = useRef();
    const attendances = time_record.attendances || [];

    const monthOptions = Array.from(
        new Set(attendances.map((att) => dayjs(att.date).format("MM")))
    ).sort();
    const yearOptions = Array.from(
        new Set(attendances.map((att) => dayjs(att.date).format("YYYY")))
    ).sort((a, b) => Number(b) - Number(a));

    const currentMonthNum = dayjs().format("MM");
    const currentYear = dayjs().format("YYYY");

    const [selectedMonth, setSelectedMonth] = useState(currentMonthNum);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const monthNames = monthOptions.map((m) => ({
        value: m,
        label: dayjs(`${m}-01`, "MM-DD").format("MMMM"),
    }));

    const formatTime = (time) =>
        time ? dayjs(time, "HH:mm:ss").format("h:mm A") : "-";

    const getAllDaysInMonth = (year, month) => {
        const start = dayjs(`${year}-${month}-01`).startOf("month");
        const end = dayjs(`${year}-${month}-01`).endOf("month");
        const days = [];
        let current = start;
        while (current.isBefore(end) || current.isSame(end, "day")) {
            days.push(current);
            current = current.add(1, "day");
        }
        return days;
    };

    const generateLogs = () => {
        const days = getAllDaysInMonth(selectedYear, selectedMonth);
        return days.map((date) => {
            const formattedDate = date.format("YYYY-MM-DD");

            const attendance = attendances.find((att) =>
                dayjs(att.date).isSame(date, "day")
            );

            const leave = employee_leaves.find((l) => l.date === formattedDate);

            return {
                date: formattedDate,
                amIn: leave
                    ? leave.leave_type
                    : formatTime(attendance?.am?.am_time_in),
                amOut: leave
                    ? leave.leave_type
                    : formatTime(attendance?.am?.am_time_out),
                pmIn: leave
                    ? leave.leave_type
                    : formatTime(attendance?.pm?.pm_time_in),
                pmOut: leave
                    ? leave.leave_type
                    : formatTime(attendance?.pm?.pm_time_out),
                undertime: leave
                    ? leave.leave_type
                    : attendance?.tardiness_record?.converted_tardy ?? "-",
                isLeave: Boolean(leave),
                leave_type: leave?.leave_type ?? null,
            };
        });
    };

    const logs = generateLogs();
    const monthKey = `${selectedYear}-${selectedMonth}`;
    const undertimeTotal = monthly_totals?.[monthKey] ?? 0;

    const handleDownloadPDF = () => {
        const element = pdfRef.current;
        html2pdf()
            .set({
                margin: 0.5,
                filename: `DTR_${time_record.first_name}_${time_record.last_name}_${selectedYear}-${selectedMonth}.pdf`,
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
    };

    return (
        <AuthenticatedLayout
            header={[
                "Monthly Daily Time Record",
                `${time_record.first_name} ${time_record.last_name} - Daily Time Record`,
            ]}
        >
            <Head title="Employee DTR" />
            <main className="flex-1 p-3 space-y-3">
                <div className="flex items-center justify-between">
                    <Link href="/dailytimerecord">
                        <Button variant="blue">
                            <ArrowLeft size={16} /> Back
                        </Button>
                    </Link>

                    <DTRFilters
                        monthNames={monthNames}
                        yearOptions={yearOptions}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        onDownloadPDF={handleDownloadPDF}
                        showDownload={true}
                    />
                </div>

                <DTRTable
                    logs={logs}
                    timeRecord={time_record}
                    undertimeTotal={undertimeTotal}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />

                <div style={{ display: "none" }}>
                    <DTRReport
                        ref={pdfRef}
                        name={`${time_record.first_name} ${time_record.last_name}`}
                        dateRange={{
                            start: dayjs(`${selectedYear}-${selectedMonth}-01`)
                                .startOf("month")
                                .format("YYYY-MM-DD"),
                            end: dayjs(`${selectedYear}-${selectedMonth}-01`)
                                .endOf("month")
                                .format("YYYY-MM-DD"),
                        }}
                        logs={logs}
                    />
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default ViewDtr;
