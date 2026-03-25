import React, { useEffect, useMemo } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { HEAD_STATUS_OPTIONS, DEPARTMENT_OPTIONS } from "@/constants";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import useToastResponse from "@/hooks/useToastResponse";

export default function AddDepartmentHeadForm({ employees = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: "",
        department: "",
        status: "active",
    });

    const selectedEmployee = useMemo(() => {
        return employees.find(
            (employee) => String(employee.id) === String(data.employee_id),
        );
    }, [employees, data.employee_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route("departmenthead.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useToastResponse();

    return (
        <form
            onSubmit={submit}
            className="rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm"
        >
            <div className="flex flex-wrap items-end gap-4">
                <div className="min-w-[220px] flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Employee Name
                    </label>
                    <Select
                        value={data.employee_id ? String(data.employee_id) : ""}
                        onValueChange={(value) => setData("employee_id", value)}
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                            {employees.map((employee) => (
                                <SelectItem
                                    key={employee.id}
                                    value={String(employee.id)}
                                >
                                    {employee.full_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.employee_id && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.employee_id}
                        </p>
                    )}
                </div>

                <div className="min-w-[180px] flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <Select
                        value={data.department || ""}
                        onValueChange={(value) => setData("department", value)}
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(DEPARTMENT_OPTIONS).map(
                                ([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                    {errors.department && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.department}
                        </p>
                    )}
                </div>

                <div className="min-w-[140px] flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <Select
                        value={data.status || ""}
                        onValueChange={(value) => setData("status", value)}
                    >
                        <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(HEAD_STATUS_OPTIONS).map(
                                ([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                    {errors.status && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.status}
                        </p>
                    )}
                </div>

                <div className="min-w-[180px] flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Position
                    </label>
                    <Input
                        type="text"
                        value={selectedEmployee?.position ?? ""}
                        disabled
                        className="h-10 w-full bg-gray-100 text-gray-600"
                    />
                </div>

                <div className="min-w-[160px] flex-1">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Work Type
                    </label>
                    <Input
                        type="text"
                        value={selectedEmployee?.work_type ?? ""}
                        disabled
                        className="h-10 w-full bg-gray-100 text-gray-600"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="h-10 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="h-10 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
}
