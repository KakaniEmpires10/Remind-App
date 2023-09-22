"use client"

import { Collection, Task } from "@prisma/client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useMemo, useState, useTransition } from "react"
import { Button } from "../ui/button"
import { CaretDownIcon, CaretUpIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { CollectionColor, CollectionColors } from "@/lib/constant"
import { Progress } from "../ui/progress"
import { Separator } from "../ui/separator"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { deleteCollection } from "@/action/collection"
import CreateTaskDialog from "./CreateTaskDialog"
import TaskCard from "./TaskCard"

interface Iprops {
    collection: Collection & {
        task: Task[]
    }
}

const CollectionCard = ({ collection }: Iprops) => {
    const [open, setOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false)
    const [isloading, startTransition] = useTransition();

    const tasks = collection.task;
    const router = useRouter();

    const removeCollection = async () => {
        try {
            await deleteCollection(collection.id)

            toast({
                title: "Success",
                description: "Collection Successfully Deleted"
            })

            router.refresh();

        } catch (e) {
            toast({
                title: "Error",
                description: "Collection Cannot be deleted, err: " + e
            })
        }
    }

    const totalTask = collection.task.length

    const taksDone = useMemo(() => {
        return collection.task.filter(task => task.done).length;
    }, [collection.task])

    const progress = totalTask === 0 ? 0 : (taksDone / totalTask) * 100

    return (
        <>
            <CreateTaskDialog open={openModal} collection={collection} setOpen={setOpenModal} />
            <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className={cn("flex w-full justify-between p-6", CollectionColors[collection.color as CollectionColor], open && "rounded-b-none", "transition-all duration-300")}>
                        <span className="text-white font-bold drop-shadow-md">
                            {collection.name}
                        </span>
                        {!open && <CaretDownIcon className="w-6 h-6" />}
                        {open && <CaretUpIcon className="w-6 h-6" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col rounded-b-md dark:bg-neutral-900 shadow-lg">
                    {tasks.length === 0 && (
                        <Button variant="ghost" className="font-semibold py-10" onClick={() => setOpenModal(true)}>
                            <p>There are no task yet :</p>
                            <span className={cn("ml-2 bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>Create One</span>
                        </Button>
                    )}
                    {tasks.length > 0 && (
                        <>
                            <Progress className="rounded-none" value={progress} />
                            <div className="flex flex-col p-4 gap-3">
                                {tasks.map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </>
                    )}
                    <Separator />
                    <footer className="flex justify-between items-center px-4 py-2">
                        <p className="text-xs text-neutral-500">Created at {collection.createdAt.toDateString()}</p>
                        {isloading && <div className="text-xs font-semibold text-neutral-400">Deleting...</div>}
                        {!isloading && (
                            <div>
                                <Button onClick={() => setOpenModal(true)} size="icon" variant="ghost"><PlusIcon /></Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="ghost"><TrashIcon /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Are you Absolutely sure ?</AlertDialogTitle>
                                        <AlertDialogDescription>This Action is Final and cannot be undone, are you sure?</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => startTransition(removeCollection)}>yes, i am sure</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </footer>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}

export default CollectionCard