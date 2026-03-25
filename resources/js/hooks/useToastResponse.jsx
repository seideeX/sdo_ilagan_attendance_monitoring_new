import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner"; // or your toast library

export default function useToastResponse() {
    const { success, error } = usePage().props;

    useEffect(() => {
        if (success) {
            toast.success(success, {
                description: "Operation successful!",
                duration: 3000,
                closeButton: true,
            });
        }

        if (error) {
            toast.error(error, {
                description: "Operation failed!",
                duration: 3000,
                closeButton: true,
            });
        }
    }, [success, error]);
}
