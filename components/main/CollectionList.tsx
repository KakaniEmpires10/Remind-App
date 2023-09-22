import { prisma } from "@/lib/Prisma"
import { currentUser } from "@clerk/nextjs"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Pencil2Icon } from "@radix-ui/react-icons"
import ButtonCollection from "./ButtonCollection"
import CollectionCard from "./CollectionCard"

const CollectionList = async () => {
    const user = await currentUser()

    const collection = await prisma.collection.findMany({
        include: {
            task: true
        },
        where: {
            userId: user?.id
        }
    })

    if (collection.length === 0) {
        return (
            <div className="space-y-5">
                <Alert>
                    <Pencil2Icon className="w-5 h-5" />
                    <AlertTitle className="font-semibold">You have no collection yet</AlertTitle>
                    <AlertDescription>Create new collection to get started</AlertDescription>
                </Alert>
                <ButtonCollection />
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <h4>You have {collection.length} Collections</h4>
            <ButtonCollection />

            {collection.map(collection => {
                return (
                    <CollectionCard key={collection.id} collection={collection} />
                )
            })}
        </div>
    )
}

export default CollectionList