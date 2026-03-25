"use client";

import React, { useState } from "react";
import TravelAuthorityForm from "./Partials/TravelOrderForm";
import TravelAuthorityTable from "./Partials/TravelOrderTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TravelOrderPage({
    travel_orders = [],
    employee = null,
    success_message,
}) {
    const [showForm, setShowForm] = useState(false);

    return (
        <AuthenticatedLayout header="Travel Order">
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
                    Add Travel Authority
                </button>

                {showForm && (
                    <TravelAuthorityForm
                        onClose={() => setShowForm(false)}
                        employee={employee}
                    />
                )}

                <TravelAuthorityTable travelOrders={travel_orders} />
            </div>
        </AuthenticatedLayout>
    );
}
