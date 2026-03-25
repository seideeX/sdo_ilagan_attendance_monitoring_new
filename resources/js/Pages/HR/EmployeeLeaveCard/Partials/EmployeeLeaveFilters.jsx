import React from "react";
import FloatingInput from "@/components/floating-input";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";
import { Search } from "lucide-react";

const EmployeeLeaveFilters = ({
    search,
    setSearch,
    departments,
    selectedDepartment,
    setSelectedDepartment,
}) => {
    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <FloatingInput
                label="Search Employee"
                icon={Search}
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <CustomDropdownCheckbox
                label="Select Department"
                items={departments}
                selected={selectedDepartment}
                onChange={setSelectedDepartment}
                buttonVariant="green"
                className="max-w-[200px] truncate"
            />
        </div>
    );
};

export default EmployeeLeaveFilters;
