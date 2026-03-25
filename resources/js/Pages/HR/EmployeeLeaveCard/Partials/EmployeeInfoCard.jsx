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
import { Card } from "@/components/ui/card";
import FloatingInput from "@/components/floating-input";
import { User, Briefcase, FileText, CreditCard, Building } from "lucide-react";

const EmployeeInfoCard = ({
    employee,
    formData,
    setFormData,
    isEditModalOpen,
    setIsEditModalOpen,
    handleChange,
    handleSave,
}) => {
    return (
        <Card className="w-full p-4">
            <div className="flex items-center justify-between mb-4">
                {/* Name and Position */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">{employee.full_name}</h2>
                    <span className="text-sm text-gray-600">
                        {employee.position}
                    </span>
                </div>

                {/* Edit Modal */}
                <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                >
                    <DialogTrigger asChild>
                        <Button variant="indigo">Edit</Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Edit Employee Info</DialogTitle>
                            <DialogDescription>
                                Update employee information. Name and Position
                                are fixed.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            {/* Disabled Name / Position */}
                            <FloatingInput
                                label="Name"
                                icon={User}
                                value={employee.full_name}
                                readOnly
                            />
                            <FloatingInput
                                label="Position"
                                icon={Briefcase}
                                value={employee.position}
                                readOnly
                            />

                            {/* Editable fields */}
                            <FloatingInput
                                label="Civil Status"
                                icon={User}
                                value={formData.civil_status || ""}
                                onChange={handleChange}
                                name="civil_status"
                            />
                            <FloatingInput
                                label="Entrance to Duty"
                                type="date"
                                icon={FileText}
                                value={formData.entrance_to_duty || ""}
                                onChange={handleChange}
                                name="entrance_to_duty"
                            />
                            <FloatingInput
                                label="GSIS Policy No."
                                icon={FileText}
                                value={formData.gsis_policy_no || ""}
                                onChange={handleChange}
                                name="gsis_policy_no"
                            />
                            <FloatingInput
                                label="TIN No."
                                icon={CreditCard}
                                value={formData.tin_no || ""}
                                onChange={handleChange}
                                name="tin_no"
                            />
                            <FloatingInput
                                label="Employment Status"
                                icon={Briefcase}
                                value={formData.employment_status || ""}
                                onChange={handleChange}
                                name="employment_status"
                            />
                            <FloatingInput
                                label="Unit"
                                icon={Building}
                                value={formData.unit || ""}
                                onChange={handleChange}
                                name="unit"
                            />
                            <FloatingInput
                                label="National Reference Card No."
                                icon={CreditCard}
                                value={
                                    formData.national_reference_card_no || ""
                                }
                                onChange={handleChange}
                                name="national_reference_card_no"
                            />
                        </div>

                        <DialogFooter className="flex justify-end mt-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="blue" onClick={handleSave}>
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Info (Read-only) */}
            <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                    <strong>Civil Status:</strong>{" "}
                    {employee.civil_status || "—"}
                </div>
                <div>
                    <strong>Entrance to Duty:</strong>{" "}
                    {employee.entrance_to_duty || "—"}
                </div>
                <div>
                    <strong>GSIS Policy No.:</strong>{" "}
                    {employee.gsis_policy_no || "—"}
                </div>
                <div>
                    <strong>TIN No.:</strong> {employee.tin_no || "—"}
                </div>
                <div>
                    <strong>Employment Status:</strong>{" "}
                    {employee.employment_status || "—"}
                </div>
                <div>
                    <strong>Unit:</strong> {employee.unit || "—"}
                </div>
                <div className="col-span-3">
                    <strong>National Reference Card No.:</strong>{" "}
                    {employee.national_reference_card_no || "—"}
                </div>
            </div>
        </Card>
    );
};

export default EmployeeInfoCard;
