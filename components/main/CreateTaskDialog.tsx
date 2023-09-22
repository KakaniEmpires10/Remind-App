import { Collection } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { cn } from "@/lib/utils"
import { CollectionColor, CollectionColors } from "@/lib/constant"
import { useForm } from "react-hook-form"
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTaskSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { Button } from "../ui/button"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { toast } from "../ui/use-toast"
import { createTask } from "@/action/task"
import { useRouter } from "next/navigation"

interface Iprops {
    open: boolean,
    collection: Collection,
    setOpen: (open: boolean) => void
}

const CreateTaskDialog = ({ open, collection, setOpen }: Iprops) => {
    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id
        }
    })

    const router = useRouter()

    const openChangeWrapper = (value: boolean) => {
        setOpen(value);
    }

    const onSubmit = async (data: createTaskSchemaType) => {
        try {

            await createTask(data)

            toast({
                title: "Success",
                description: "data is successfully addesd"
            })

            openChangeWrapper(false);

            router.refresh();

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "you got this error : " + error
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={openChangeWrapper}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Task to Collection: <span className={cn("p-1 font-bold bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>{collection.name}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Add task to your Collection. You can add as many task as you want
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} placeholder="write your content here..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                            </FormField>
                            <FormField
                                control={form.control}
                                name="expiresAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expires At</FormLabel>
                                        <FormDescription>When do you want this task to expires?</FormDescription>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className={cn("flex w-full justify-between", !field.value && "text-sm text-neutral-600")}>
                                                        <CalendarIcon className="w-5 h-5" />
                                                        {field.value && format(field.value, "PPP")}
                                                        {!field.value && <span>No expiration date? </span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}>
                            </FormField>
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)} className={cn("w-full text-white dark:text-white", CollectionColors[collection.color as CollectionColor])}>
                        {form.formState.isSubmitting && (
                            <ReloadIcon className="animate-spin w-4 h-4 mr-2" />
                        )}
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskDialog