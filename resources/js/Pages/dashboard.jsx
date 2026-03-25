"use client";

import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    ResponsiveContainer,
    BarChart as ReBarChart,
    Bar,
    LineChart as ReLineChart,
    Line,
    PieChart as RePieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";

export default function Dashboard({
    averageAmIn,
    bestDepartment,
    latePercentage,
    monthlyTrends,
    onTimeRate,
    bestEmployee,
    departmentRanking,
    employees = [],
    attendanceRecords = [], // fetched from backend
}) {
    // Constants
    const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = ["2025"];

    const today = new Date();

    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDay, setSelectedDay] = useState([
        today.getDate().toString(),
    ]);
    const [selectedMonth, setSelectedMonth] = useState([
        months[today.getMonth()],
    ]);
    const [selectedYear, setSelectedYear] = useState([
        today.getFullYear().toString(),
    ]);

    // 🔍 Filter logic for search + date
    const filteredEmployees = useMemo(() => {
        return attendanceRecords.filter((emp) => {
            const name = `${emp.first_name} ${emp.last_name}`.toLowerCase();
            const matchesSearch = name.includes(searchQuery.toLowerCase());

            const recordDate = new Date(emp.date);
            const matchDay = selectedDay.length
                ? selectedDay.includes(recordDate.getDate().toString())
                : true;
            const matchMonth = selectedMonth.length
                ? selectedMonth.includes(months[recordDate.getMonth()])
                : true;
            const matchYear = selectedYear.length
                ? selectedYear.includes(recordDate.getFullYear().toString())
                : true;

            return matchesSearch && matchDay && matchMonth && matchYear;
        });
    }, [
        attendanceRecords,
        searchQuery,
        selectedDay,
        selectedMonth,
        selectedYear,
    ]);

    // Chart Data
    const barData = [
        {
            name: "Average AM In",
            "Avg AM In": averageAmIn
                ? parseInt(averageAmIn.replace(":", ""))
                : 0,
        },
        { name: "Late %", "Late %": latePercentage },
    ];

    const lineData = monthlyTrends.map((t) => ({
        month: t.month,
        avg_am_time: t.avg_am_time
            ? parseInt(t.avg_am_time.replace(":", ""))
            : 0,
    }));

    const pieData = [
        { name: "On-time", value: Number(onTimeRate?.toFixed(2) || 0) },
        { name: "Late", value: Number((100 - onTimeRate).toFixed(2) || 0) },
    ];

    const deptBarData = departmentRanking.map((d) => ({
        department: d.department,
        avg_am_time: d.avg_am_time
            ? parseInt(d.avg_am_time.replace(":", ""))
            : 0,
    }));

    const barColors = ["#ef4444", "#6b7280"];
    const lineColor = "#10b981";
    const deptBarColor = "#8b5cf6";
    const pieColors = ["#10b981", "#ef4444"];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="AMS Dashboard" />
            <main className="flex-1 p-6 grid gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-blue-50 border-blue-200 min-h-[120px]">
                        <CardHeader>
                            <CardTitle className="text-base text-blue-800">
                                Average AM In
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-blue-900">
                                {averageAmIn}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200 min-h-[120px]">
                        <CardHeader>
                            <CardTitle className="text-base text-purple-800">
                                Best Department
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-purple-900">
                                {bestDepartment?.department} (avg{" "}
                                {bestDepartment?.avg_time})
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200 min-h-[120px]">
                        <CardHeader>
                            <CardTitle className="text-base text-green-800">
                                On-time Rate
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-900">
                                {onTimeRate}%
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-yellow-50 border-yellow-200 min-h-[120px]">
                        <CardHeader>
                            <CardTitle className="text-base text-yellow-800">
                                Best Employee
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-yellow-900">
                                {bestEmployee?.first_name}{" "}
                                {bestEmployee?.last_name} (
                                {bestEmployee?.on_time_count} days)
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Attendance Overview */}
                    <Card className="bg-white shadow-md border min-h-[300px]">
                        <CardHeader>
                            <CardTitle className="text-base text-blue-700">
                                Attendance Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReBarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="Avg AM In"
                                        fill={barColors[0]}
                                    />
                                    <Bar dataKey="Late %" fill={barColors[1]} />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Monthly Trends */}
                    <Card className="bg-white shadow-md border min-h-[300px]">
                        <CardHeader>
                            <CardTitle className="text-base text-indigo-700">
                                Monthly Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReLineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="avg_am_time"
                                        stroke={lineColor}
                                        strokeWidth={3}
                                    />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* On-time Arrival Rate */}
                    <Card className="bg-white shadow-md border min-h-[300px]">
                        <CardHeader>
                            <CardTitle className="text-base text-emerald-700">
                                On-time Arrival Rate
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={50}
                                        outerRadius={90}
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    pieColors[
                                                        index % pieColors.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </RePieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Department Ranking */}
                    <Card className="bg-white shadow-md border min-h-[300px]">
                        <CardHeader>
                            <CardTitle className="text-base text-cyan-700">
                                Department Ranking
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReBarChart data={deptBarData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="avg_am_time"
                                        fill={deptBarColor}
                                    />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Employee Attendance */}
                <Card className="bg-white shadow-md border">
                    <CardHeader>
                        <CardTitle className="text-base text-red-700">
                            Employee Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Filters */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex items-center w-full">
                                    <Search className="text-gray-500 mr-2" />
                                    <Input
                                        type="text"
                                        placeholder="Search Employee..."
                                        className="w-full"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-medium shadow-sm w-[180px] justify-center select-none">
                                    <span>All Departments</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span>Day:</span>
                                        <CustomDropdownCheckbox
                                            label=""
                                            items={days}
                                            selected={selectedDay}
                                            onChange={setSelectedDay}
                                            buttonVariant="indigo"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>Month:</span>
                                        <CustomDropdownCheckbox
                                            label=""
                                            items={months}
                                            selected={selectedMonth}
                                            onChange={setSelectedMonth}
                                            buttonVariant="cyan"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>Year:</span>
                                        <CustomDropdownCheckbox
                                            label=""
                                            items={years}
                                            selected={selectedYear}
                                            onChange={setSelectedYear}
                                            buttonVariant="blue"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Table */}
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-gray-200 border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Employee Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Position
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Department
                                        </th>

                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees.length > 0 ? (
                                        employees.map((emp, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {emp.first_name}{" "}
                                                    {emp.last_name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {emp.position}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800">
                                                    {emp.department}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                                    {/* Status left blank */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center text-gray-500 py-4 text-sm"
                                            >
                                                No records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </AuthenticatedLayout>
    );
}
