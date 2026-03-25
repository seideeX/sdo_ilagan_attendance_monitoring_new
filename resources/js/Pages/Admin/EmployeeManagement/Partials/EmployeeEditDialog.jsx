import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInput from "@/components/floating-input";
import { CheckCircle, Briefcase, Building2, User } from "lucide-react";
import { CustomDropdownCheckbox } from "@/components/dropdown-menu-main";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

const EmployeeEditDialog = ({
    editForm,
    setEditForm,
    editOpen,
    setEditOpen,
    department_choices,
}) => {
    if (!editForm) return null;

    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                    <DialogDescription>
                        Update employee information.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <FloatingInput
                        label="First Name"
                        icon={User}
                        value={editForm.first_name}
                        onChange={(e) =>
                            setEditForm({
                                ...editForm,
                                first_name: e.target.value,
                            })
                        }
                    />
                    <FloatingInput
                        label="Middle Name"
                        icon={User}
                        value={editForm.middle_name}
                        onChange={(e) =>
                            setEditForm({
                                ...editForm,
                                middle_name: e.target.value,
                            })
                        }
                    />
                    <FloatingInput
                        label="Last Name"
                        icon={User}
                        value={editForm.last_name}
                        onChange={(e) =>
                            setEditForm({
                                ...editForm,
                                last_name: e.target.value,
                            })
                        }
                    />
                    <FloatingInput
                        label="Position"
                        icon={Briefcase}
                        value={editForm.position}
                        onChange={(e) =>
                            setEditForm({
                                ...editForm,
                                position: e.target.value,
                            })
                        }
                    />

                    {/* Department Dropdown */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Department"
                            icon={Building2}
                            value={editForm.department || ""}
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Department"
                                items={department_choices}
                                onChange={(val) =>
                                    setEditForm({
                                        ...editForm,
                                        department: val,
                                    })
                                }
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>

                    {/* Work Type */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Work Type"
                            icon={Briefcase}
                            value={editForm.work_type || ""}
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Work Type"
                                items={["Full", "Fixed", "Work From Home"]}
                                onChange={(val) =>
                                    setEditForm({ ...editForm, work_type: val })
                                }
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="relative w-full">
                        <FloatingInput
                            label="Status"
                            icon={CheckCircle}
                            value={
                                editForm.active_status ? "Active" : "Inactive"
                            }
                            readOnly
                            onChange={() => {}}
                        />
                        <div className="absolute right-2 top-0 h-full flex items-center">
                            <CustomDropdownCheckbox
                                label="Select Status"
                                items={["Active", "Inactive"]}
                                onChange={(val) =>
                                    setEditForm({
                                        ...editForm,
                                        active_status: val === "Active" ? 1 : 0,
                                    })
                                }
                                buttonVariant="white"
                                iconOnly
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose className="ml-2">
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="blue"
                        onClick={() => {
                            router.put(
                                route("employees.update", editForm.id),
                                editForm,
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        setEditOpen(false);
                                        toast.success(
                                            "Employee updated successfully 🎉"
                                        );
                                    },
                                }
                            );
                        }}
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeEditDialog;
