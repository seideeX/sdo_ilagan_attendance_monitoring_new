"use client";

import React, { useState } from "react";
import LocatorSlipForm from "./Partials/LocatorSlipForm";
import LocatorSlipTable from "./Partials/LocatorSlipTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function LocatorSlipPage({
    locator_slips = [],
    employee = null,
    success_message,
}) {
    const [showForm, setShowForm] = useState(false);

    return (
        <AuthenticatedLayout header="Locator Slips">
            <div className="p-6">
                {success_message && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-green-800">
                        {success_message}
                    </div>
                )}

                <button
                    onClick={() => setShowForm(true)}
                    className="mb-4 rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Add Locator Slip
                </button>

                {showForm && (
                    <LocatorSlipForm
                        onClose={() => setShowForm(false)}
                        employee={employee}
                    />
                )}

                <LocatorSlipTable slips={locator_slips} />
            </div>
        </AuthenticatedLayout>
    );
}
