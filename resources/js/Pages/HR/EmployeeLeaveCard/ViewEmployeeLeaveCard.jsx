import React, { useState, useEffect, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";
import { Button } from "@/components/ui/button";

import EmployeeInfoCard from "./Partials/EmployeeInfoCard";
import LeaveFormModal from "./Partials/LeaveFormModal";
import LeaveTable from "./Partials/LeaveTable";

const ViewEmployeeCard = ({ employee }) => {
    const [vacationLeaves, setVacationLeaves] = useState(
        employee.vacation_leaves || []
    );
    const [sickLeaves, setSickLeaves] = useState(employee.sick_leaves || []);

    useEffect(() => {
        setVacationLeaves(employee.vacation_leaves || []);
        setSickLeaves(employee.sick_leaves || []);
    }, [employee]);

    const currentYear = new Date().getFullYear().toString();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const years = useMemo(() => {
        const set = new Set();
        [...vacationLeaves, ...sickLeaves].forEach((l) => {
            if (l.period?.period)
                set.add(new Date(l.period.period).getFullYear().toString());
        });
        return Array.from(set).sort((a, b) => b - a);
    }, [vacationLeaves, sickLeaves]);

    const filteredLeaves = useMemo(() => {
        const map = {};
        vacationLeaves.forEach((vl) => {
            if (
                vl.period?.period &&
                new Date(vl.period.period).getFullYear().toString() ===
                    selectedYear
            ) {
                map[vl.period_id] = {
                    period: vl.period,
                    vacation: vl,
                    sick: null,
                };
            }
        });
        sickLeaves.forEach((sl) => {
            if (
                sl.period?.period &&
                new Date(sl.period.period).getFullYear().toString() ===
                    selectedYear
            ) {
                map[sl.period_id] = {
                    ...map[sl.period_id],
                    period: sl.period,
                    sick: sl,
                };
            }
        });
        return Object.values(map).sort(
            (a, b) => new Date(a.period.period) - new Date(b.period.period)
        );
    }, [vacationLeaves, sickLeaves, selectedYear]);

    const [leaveForm, setLeaveForm] = useState({
        leave_type: "vacation",
        period: "",
        pay_type: "wpay",
        days: "",
        balance: "",
        remarks: "",
        particulars: "",
    });

    const [formData, setFormData] = useState({
        civil_status: employee?.civil_status || "",
        entrance_to_duty: employee?.entrance_to_duty
            ? new Date(employee.entrance_to_duty).toISOString().split("T")[0]
            : "",
        gsis_policy_no: employee?.gsis_policy_no || "",
        tin_no: employee?.tin_no || "",
        employment_status: employee?.employment_status || "",
        unit: employee?.unit || "",
        national_reference_card_no: employee?.national_reference_card_no || "",
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

    const availablePeriods =
        leaveForm.leave_type === "vacation"
            ? vacationLeaves.map((vl) => vl.period)
            : sickLeaves.map((sl) => sl.period);

    const handleLeaveChange = (e) =>
        setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });

    const handleSaveLeave = () => {
        if (!leaveForm.period) return alert("Please select a period.");
        const payload = {
            employee_id: employee.id,
            period_id: leaveForm.period,
            used_wpay: leaveForm.pay_type === "wpay" ? leaveForm.days : 0,
            used_wopay: leaveForm.pay_type === "wopay" ? leaveForm.days : 0,
            remarks: leaveForm.remarks,
            particulars: leaveForm.particulars,
        };
        const routeName =
            leaveForm.leave_type === "vacation"
                ? "vacation-leave.update"
                : "sick-leave.update";
        router.put(route(routeName), payload, {
            onSuccess: () => {
                setIsLeaveModalOpen(false);
                router.reload({ only: ["employee"], preserveScroll: true });
            },
            onError: (errors) => console.error(errors),
        });
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = () => {
        router.put(
            route("employeeleavecard.update", { id: employee.id }),
            formData,
            {
                onSuccess: () => setIsEditModalOpen(false),
                onError: (errors) => console.error(errors),
            }
        );
    };

    return (
        <AuthenticatedLayout header="Employee's Leave Card">
            <Head title="Employee Leave Card" />
            <main className="flex-1 p-3">
                <EmployeeInfoCard
                    employee={employee}
                    formData={formData}
                    setFormData={setFormData}
                    isEditModalOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    handleChange={handleChange}
                    handleSave={handleSave}
                />

                <div className="flex justify-end mt-4 gap-4">
                    <CustomDropdownCheckbox
                        label="Select Year"
                        items={years}
                        selected={selectedYear}
                        onChange={setSelectedYear}
                        buttonVariant="blue"
                    />

                    <LeaveFormModal
                        isLeaveModalOpen={isLeaveModalOpen}
                        setIsLeaveModalOpen={setIsLeaveModalOpen}
                        leaveForm={leaveForm}
                        handleLeaveChange={handleLeaveChange}
                        availablePeriods={availablePeriods}
                        handleSaveLeave={handleSaveLeave}
                    />
                </div>

                <LeaveTable filteredLeaves={filteredLeaves} />
            </main>
        </AuthenticatedLayout>
    );
};

export default ViewEmployeeCard;
