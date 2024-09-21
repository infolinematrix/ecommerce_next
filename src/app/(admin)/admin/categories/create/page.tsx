import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import CategoryCreateForm from "../components/form_create";

interface Props {
  param: string;
  searchParams: { parent: string | undefined };
}
export default async function CreateCategoryPage({
  param,
  searchParams,
}: Props) {
  // const parent = await get_category(searchParams.parent);

  return (
    // <Shell variant="sidebar" className="overflow-hidden">
    //   <div className="flex flex-row gap-4 justify-between">
    //     <PageHeader>
    //       <>
    //         <PageHeaderHeading size="md">Create</PageHeaderHeading>
    //         <PageHeaderDescription size="sm">
    //           Create new category for your products.
    //         </PageHeaderDescription>
    //       </>
    //     </PageHeader>
    //     <>

    //     </>
    //   </div>
    //   <ScrollArea className="w-full pb-3.5">
    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
    //       <div className="lg:col-span-2">
    //         <CreateForm parentId={searchParams.parent} />
    //       </div>
    //       <div className="hidden md:block">
    //         <div className="p-8">
    //           <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
    //             Help
    //           </div>

    //           <p className="mt-2 text-slate-500">
    //             Looking to take your team away on a retreat to enjoy awesome
    //             food and take in some sunshine? We have a list of places to do
    //             just that.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </ScrollArea>
    // </Shell>

    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-between">
          <PageHeader>
            <PageHeaderHeading size="md">Create</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Create Product.
            </PageHeaderDescription>
          </PageHeader>

          <PageActions>
            <Link
              href={{
                pathname: "/admin/categories/create/",
                query: { parent: searchParams.parent },
              }}
            >
              <Button variant={"secondary"}>Create new </Button>
            </Link>
          </PageActions>
        </div>

        <div>
          <ScrollArea className="w-full pb-3.5 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 overflow-hidden">
              <div className="lg:col-span-2">
                <CategoryCreateForm parentId={searchParams.parent} />
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
      </div>
    </Shell>
  );
}
