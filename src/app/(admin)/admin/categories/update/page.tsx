import {
  categoryById,
  categoryDeleteById,
  // categoryDeleteById,
  // deleteById,
} from "@/lib/actions/category";
import UpdateForm from "../components/form_update";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CreateForm from "../components/form_create";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { categories } from "@/db/schemas/categories";
import { eq } from "drizzle-orm";

interface Props {
  searchParams: { [key: string]: string };
}

export default async function CategoryUpdatePage({ searchParams }: Props) {
  const category = await categoryById(searchParams.id);

  const deleteCategory = async () => {
    "use server";
    const res = await categoryDeleteById(searchParams.id);
    if (!res) console.log("Something went wrong..");
    console.log("--------");

    return <></>;
  };

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-between">
          <PageHeader>
            <PageHeaderHeading size="md">Update</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Manage categories for your products.
            </PageHeaderDescription>
          </PageHeader>

          <PageActions></PageActions>
        </div>

        <ScrollArea className="w-full pb-3.5 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 overflow-hidden">
            <div className="lg:col-span-2">
              <UpdateForm category={category} />
            </div>

            {/* -----------RIGHT------------------- */}
            <div className="hidden md:block min-h-screen border-l _bg-primary-foreground rounded-lg p-4">
              <div className="uppercase tracking-wide text-lg font-semibold">
                Help
              </div>

              <p className="mt-2 text-slate-500">
                Help & tutorial coming soon...
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </Shell>
    // <>
    //   <Shell variant="sidebar" className="overflow-hidden">
    //     <div className="flex flex-row gap-4 justify-between">
    //       <PageHeader>
    //         <>
    //           <PageHeaderHeading size="md">Update</PageHeaderHeading>
    //           <PageHeaderDescription size="sm">
    //             Update category for your products.
    //           </PageHeaderDescription>
    //         </>
    //       </PageHeader>
    //       <></>
    //     </div>
    //     <div className="flex flex-row gap-8 justify-between">
    //       <div className="flex w-2/3">
    //         <ScrollArea className="w-full px-4">
    //           <div className="h-lg mb-20">
    //             <UpdateForm category={category} />
    //           </div>

    //           <Alert variant="destructive">
    //             <RocketIcon className="h-4 w-4" />
    //             <AlertTitle>Delete!</AlertTitle>
    //             <AlertDescription>
    //               On delete it remove all the child categories and all the
    //               related properties. Still you want to delete this category
    //               <span>
    //                 <form action={deleteCategory} method="POST">
    //                   <Button variant={"link"} type="submit" className="p-0">
    //                     Click here
    //                   </Button>
    //                 </form>
    //               </span>
    //             </AlertDescription>
    //           </Alert>
    //         </ScrollArea>
    //       </div>

    //       <div className="flex w-1/3">sad</div>
    //     </div>
    //   </Shell>
    // </>
  );
}
