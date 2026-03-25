import React from "react";
import { Button } from "@/Components/ui/button";
import { Printer } from "lucide-react";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";

const DTRFilters = ({
    monthNames,
    yearOptions,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    onDownloadPDF,
    showDownload = true, // new prop to control button
}) => {
    return (
        <div className="flex items-center gap-2">
            <CustomDropdownCheckbox
                label="Select Month"
                items={monthNames.map((m) => m.label)}
                selected={
                    monthNames.find((m) => m.value === selectedMonth)?.label
                }
                onChange={(monthLabel) => {
                    const monthNum = monthNames.find(
                        (m) => m.label === monthLabel
                    )?.value;
                    setSelectedMonth(monthNum);
                }}
                buttonVariant="green"
            />
            <CustomDropdownCheckbox
                label="Select Year"
                items={yearOptions}
                selected={selectedYear}
                onChange={setSelectedYear}
                buttonVariant="green"
            />
            {showDownload && (
                <Button variant="blueDark" onClick={onDownloadPDF}>
                    <Printer size={16} className="mr-1" /> Download PDF
                </Button>
            )}
        </div>
    );
};

export default DTRFilters;
