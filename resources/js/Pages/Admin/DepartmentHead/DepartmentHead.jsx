import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import HeadList from "./Partials/HeadList";
import AddDepartmentHeadForm from "./Partials/AddDepartmentHeadForm";

const DepartmentHead = ({ dept_heads = [], queryParams = {}, employees }) => {
    return (
        <AuthenticatedLayout header="Department Head Management">
            <Head title="AMS" />
            <main className="rounded-xl p-4 mt-4 border-2 border-blue-100 shadow-lg">
                <div className="mb-5">
                    <AddDepartmentHeadForm employees={employees} />
                </div>

                <HeadList
                    dept_heads={dept_heads}
                    queryParams={queryParams}
                ></HeadList>
            </main>
        </AuthenticatedLayout>
    );
};

export default DepartmentHead;
