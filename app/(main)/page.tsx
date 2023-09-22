import CollectionList from "@/components/main/CollectionList"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@clerk/nextjs"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return (
      <h2>You are not loggedin</h2>
    )
  }

  return (
    <>
      <div className="flex w-full mb-7">
        <h1 className="font-bold text-4xl">
          Hello <br /> {user.firstName}
        </h1>
      </div>
      <Separator className="mb-10" />
      <CollectionList />
    </>
  )
}

