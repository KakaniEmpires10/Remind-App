"use client"

import { useState } from "react";
import { Button } from "../ui/button"
import CreateCollectionField from "./CreateCollectionField";

const ButtonCollection = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleChande = (open: boolean) => {
        setOpen(open);
    }

    return (
        <div className="rounded-md bg-gradient-to-br from-blue-800 via-blue-600 to-sky-400 p-[1px]">
            <Button variant="outline" className="w-full dark:bg-neutral-950 bg-white" onClick={() => setOpen(true)}>
                <span className="font-bold bg-gradient-to-br from-blue-600 to-sky-400 bg-clip-text text-transparent">
                    Create Collection
                </span>
            </Button>
            <CreateCollectionField open={open} onOpenChange={handleChande} />
        </div>
    )
}

export default ButtonCollection