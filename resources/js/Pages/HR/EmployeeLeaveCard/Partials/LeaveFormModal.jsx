import React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInput from "@/components/floating-input";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";
import {
    FileText,
    Calendar,
    ClipboardList,
    DollarSign,
    FileSignature,
} from "lucide-react";

const LeaveFormModal = ({
    isLeaveModalOpen,
    setIsLeaveModalOpen,
    leaveForm,
    handleLeaveChange,
    availablePeriods,
    handleSaveLeave,
}) => {
    return (
        <Dialog open={isLeaveModalOpen} onOpenChange={setIsLeaveModalOpen}>
            <DialogTrigger asChild>
                <Button variant="blue">Add / Edit Leave</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Leave Record</DialogTitle>
                    <DialogDescription>
                        Enter leave details for the selected month.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 my-4">
                    {/* Leave Type */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Leave Type"
                            icon={FileText}
                            value={
                                leaveForm.leave_type === "vacation"
                                    ? "Vacation Leave"
                                    : "Sick Leave"
                            }
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Leave Type"
                                items={["Vacation Leave", "Sick Leave"]}
                                onChange={(val) =>
                                    handleLeaveChange({
                                        target: {
                                            name: "leave_type",
                                            value:
                                                val === "Vacation Leave"
                                                    ? "vacation"
                                                    : "sick",
                                        },
                                    })
                                }
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>

                    {/* Period */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Period"
                            icon={Calendar}
                            value={
                                availablePeriods.find(
                                    (p) => p.id === leaveForm.period
                                )
                                    ? new Date(
                                          availablePeriods.find(
                                              (p) => p.id === leaveForm.period
                                          ).period
                                      ).toLocaleDateString("en-US", {
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : ""
                            }
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Period"
                                items={availablePeriods.map((p) =>
                                    new Date(p.period).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )
                                )}
                                onChange={(val) => {
                                    const matched = availablePeriods.find(
                                        (p) =>
                                            new Date(
                                                p.period
                                            ).toLocaleDateString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            }) === val
                                    );
                                    handleLeaveChange({
                                        target: {
                                            name: "period",
                                            value: matched?.id || "",
                                        },
                                    });
                                }}
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>

                    {/* Particulars */}
                    <FloatingInput
                        label="Particulars"
                        icon={ClipboardList}
                        name="particulars"
                        value={leaveForm.particulars || ""}
                        onChange={handleLeaveChange}
                    />

                    {/* Pay Type */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Pay Type"
                            icon={DollarSign}
                            value={
                                leaveForm.pay_type === "wpay"
                                    ? "With Pay"
                                    : "Without Pay"
                            }
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Pay Type"
                                items={["With Pay", "Without Pay"]}
                                onChange={(val) =>
                                    handleLeaveChange({
                                        target: {
                                            name: "pay_type",
                                            value:
                                                val === "With Pay"
                                                    ? "wpay"
                                                    : "wopay",
                                        },
                                    })
                                }
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>

                    {/* Days */}
                    <FloatingInput
                        label="Days"
                        type="number"
                        icon={FileSignature}
                        name="days"
                        step="0.01"
                        value={leaveForm.days || ""}
                        onChange={handleLeaveChange}
                    />

                    {/* Remarks */}
                    <FloatingInput
                        label="Remarks"
                        icon={FileSignature}
                        name="remarks"
                        value={leaveForm.remarks || ""}
                        onChange={handleLeaveChange}
                    />
                </div>

                <DialogFooter className="flex justify-end mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="blue" onClick={handleSaveLeave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LeaveFormModal;
