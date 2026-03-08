import React, { useState } from "react";
import { TextField, Button } from "../vibes";
import { createCategory } from "../services/api";

interface CategoryFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CategoryForm({ onSuccess, onCancel }: CategoryFormProps) {
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await createCategory(name.trim());
            onSuccess();
            // Optional: Since categories are used in the expense form, 
            // you might want to trigger a global refresh or just notify the user.
            alert("Category added successfully!");
            window.location.reload();
        } catch (err: any) {
            setError(err.message || "Failed to create category");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const buttonGroupStyle: React.CSSProperties = {
        display: "flex",
        gap: "0.5rem",
        marginTop: "0.5rem",
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <TextField
                label="Category Name"
                placeholder="e.g., Healthcare, Subscriptions"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={error || undefined}
                fullWidth
                required
            />

            <div style={buttonGroupStyle}>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || !name.trim()}
                    fullWidth
                >
                    {isSubmitting ? "Saving..." : "Save Category"}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
