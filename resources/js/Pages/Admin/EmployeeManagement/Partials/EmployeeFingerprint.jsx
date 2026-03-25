import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const EmployeeFingerprint = ({
    employees,
    unregistered,
    selectedEmployee,
    setSelectedEmployee,
    registerFingerprint,
    scanning,
    scanStatus,
    scanMessage,
    cancelScan,
    availableFingers,
    testOpen,
    setTestOpen,
    startTestFingerprint,
    getFingerprintColor,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-gradient-to-br from-blue-100 to-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col">
            <h2 className="text-l font-bold text-gray-800 mb-1 flex items-center gap-2">
                <Fingerprint className="w-6 h-6 text-blue-600" />
                Employee Fingerprint Registration
            </h2>

            <div className="flex flex-col items-center gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="cyan"
                            role="combobox"
                            className="justify-between"
                        >
                            {unregistered.find(
                                (emp) => emp.id === selectedEmployee
                            )?.full_name || "-- Choose Employee --"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-3">
                        <Command>
                            <CommandInput placeholder="Search employee..." />
                            <CommandList>
                                <CommandEmpty>No employee found.</CommandEmpty>
                                <CommandGroup>
                                    {employees
                                        .filter(
                                            (emp) =>
                                                availableFingers(emp.id) > 0
                                        )
                                        .map((emp) => (
                                            <CommandItem
                                                key={emp.id}
                                                onSelect={() => {
                                                    setSelectedEmployee(emp.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                {emp.full_name} (
                                                {availableFingers(emp.id)}{" "}
                                                finger
                                                {availableFingers(emp.id) !== 1
                                                    ? "s"
                                                    : ""}{" "}
                                                available)
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <div className="flex flex-col items-center justify-center text-center">
                    <Fingerprint
                        className={`w-20 h-20 transition-all duration-300 mt-5 ${getFingerprintColor()}`}
                    />
                    <p
                        className={`text-sm font-semibold mt-4 min-h-[1.25rem] ${
                            scanStatus === "error"
                                ? "text-red-500"
                                : scanStatus === "success"
                                ? "text-green-500"
                                : "text-blue-500"
                        }`}
                    >
                        {scanStatus === "error"
                            ? scanMessage
                            : scanStatus === "success"
                            ? scanMessage
                            : scanning
                            ? scanMessage
                            : selectedEmployee
                            ? `${availableFingers(
                                  selectedEmployee
                              )} Available Fingerprint${
                                  availableFingers(selectedEmployee) !== 1
                                      ? "s"
                                      : ""
                              } Registration`
                            : ""}
                    </p>
                </div>

                <div className="cursor-pointer w-full flex justify-center gap-4">
                    <Button
                        variant={scanning ? "cyan" : "blue"}
                        onClick={() => {
                            if (scanning) cancelScan();
                            else registerFingerprint();
                        }}
                        disabled={!selectedEmployee}
                        className="w-60 mt-1"
                    >
                        {scanning
                            ? "Cancel"
                            : scanStatus === "success"
                            ? "Register Another"
                            : scanStatus === "error"
                            ? "Retry"
                            : "Register Fingerprint"}
                    </Button>

                    {/* Test Fingerprint Dialog */}
                    <AlertDialog
                        open={testOpen}
                        onOpenChange={(open) => {
                            setTestOpen(open);
                            if (open) startTestFingerprint();
                        }}
                    >
                        <AlertDialogTrigger asChild>
                            <Button variant="blue" className="w-60 mt-1">
                                Test Fingerprint
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Test Fingerprint
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Place your finger on the scanner. It will
                                    check against registered employees.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="flex flex-col items-center py-4">
                                <Fingerprint
                                    className={`w-20 h-20 ${
                                        scanStatus === "scanning"
                                            ? "text-blue-500 animate-pulse"
                                            : scanStatus === "success"
                                            ? "text-green-500 animate-bounce"
                                            : "text-red-500"
                                    }`}
                                />
                                <p className="mt-3 text-sm text-gray-700">
                                    {scanMessage}
                                </p>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={() => setTestOpen(false)}
                                >
                                    Close
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFingerprint;
