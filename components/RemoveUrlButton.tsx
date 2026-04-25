"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react"; 

export function RemoveUrlButton({url}: {url: string}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const removeSource = useMutation(api.documents.removeUrl);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await removeSource({ url });
        } catch (error) {
            console.error("Failed to delete:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-200 hover:text-red-600 transition-colors disabled:opacity-50"
        >
            {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Trash2 size={16} />
            )}
        </button>
    )
}