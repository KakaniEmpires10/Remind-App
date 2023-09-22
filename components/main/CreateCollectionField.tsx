import { useForm } from "react-hook-form"
import { Sheet, SheetContent, SheetDescription, SheetHeader } from "../ui/sheet"
import { createCollectionSchema, createCollectionSchemaType } from "@/schema/createCollectionSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CollectionColor, CollectionColors } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { createCollection } from "@/action/collection"
import { toast } from "../ui/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

const CreateCollectionField = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const form = useForm<createCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {},
    })

    const router = useRouter();

    const onSubmit = async (values: createCollectionSchemaType) => {
        try {
            await createCollection(values);

            onOpenChangeWrapper(false);
            router.refresh();

            toast({
                title: "Success",
                description: "Collection Successfully Created"
            })

        } catch (e) {
            toast({
                title: "Error!!",
                description: "Something Went Wrong",
                variant: "destructive"
            })
        }
    }

    const onOpenChangeWrapper = (open: boolean) => {
        form.reset();
        onOpenChange(open)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChangeWrapper}>
            <SheetContent className="space-y-3">
                <SheetHeader>Create Your Collection</SheetHeader>
                <SheetDescription>This is one of the way to orginize your time</SheetDescription>
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl {...field}>
                                        <Input placeholder="Personal" {...form} />
                                    </FormControl>
                                    <FormDescription>Collection Name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl {...field}>
                                        <Select onValueChange={(color) => field.onChange(color)}>
                                            <SelectTrigger className={cn("dark:text-white text-black", CollectionColors[field.value as CollectionColor])}>
                                                <SelectValue placeholder="Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(CollectionColors).map(color => (
                                                    <SelectItem key={color} value={color} className={cn("text-white my-1 rounded-md focus:text-white focus:ring-2 focus:ring-black focus:dark:ring-white cursor-pointer focus-within:font-semibold focus:ring-inset focus:px-8 transition-all duration-300", CollectionColors[color as CollectionColor])}>
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>Select a Color</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Separator className="my-7" />
                <Button disabled={form.formState.isSubmitting} variant={"outline"} type="submit" className={cn("w-full", form.watch("color") && CollectionColors[form.getValues("color") as CollectionColor])} onClick={form.handleSubmit(onSubmit)}>
                    {form.formState.isSubmitting && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
                    Confirm
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionField