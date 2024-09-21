import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "../../components/page-header";
import { Shell } from "../../components/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_parents } from "@/lib/actions/category";
import { HomeIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { CategoryType } from "@/db/schemas/categories";
import CreateForm from "./components/form_create";

interface Props {
  // param: string;
  // searchParams: { [key: string]: string | string[] | undefined };
  searchParams: { parent: string | undefined };
}

export default async function CategoriesPage({ searchParams }: Props) {
  const data = await get_parents(searchParams.parent);
  console.log(data);

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-between">
          <PageHeader>
            <PageHeaderHeading size="md">Categories</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Manage categories for your products.
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
                <TableData data={data} />
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
    // <Shell variant="sidebar" className="overflow-hidden">
    //   <div className="flex flex-row gap-8 justify-between">
    //     <div className="flex w-2/3">
    //       <ScrollArea className="w-full pb-3.5">
    //         <div className="flex flex-row gap-4 justify-between">
    //           <PageHeader>
    //             <>
    //               <PageHeaderHeading size="md">Categories</PageHeaderHeading>
    //               <PageHeaderDescription size="sm">
    //                 Manage your account settings
    //               </PageHeaderDescription>
    //             </>
    //           </PageHeader>
    //           <>
    //             <Link
    //               href={{
    //                 pathname: "/admin/categories/create/",
    //                 query: { parent: searchParams.parent },
    //               }}
    //             >
    //               <Button variant={"secondary"}>Create new </Button>
    //             </Link>
    //           </>
    //         </div>
    //         {/* {data && data.length > 0 ? (
    //           <DataTable data />
    //         ) : (
    //           <div>Loading....</div>
    //         )} */}
    //         <div className="pt-4">
    //           <TableData data={data} />
    //         </div>
    //       </ScrollArea>
    //     </div>
    //     <div className="flex w-1/3">sad</div>
    //   </div>
    // </Shell>
  );
}

const TableData = ({ data }: any) => {
  return (
    <>
      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Child</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Parent</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category: CategoryType) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">
                {category.has_child == true ? (
                  <Link
                    href={{
                      pathname: "/admin/categories",
                      query: { parent: category.id },
                    }}
                  >
                    {category.name}
                  </Link>
                ) : (
                  <span>{category.name}</span>
                )}
              </TableCell>
              <TableCell>{category.has_child ? "True" : "False"}</TableCell>
              <TableCell>{category.active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                {category.parent_id == null ? "Root" : category.parent_id}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant={"secondary"} className="">
                  <Link
                    href={{
                      pathname: "/admin/categories/update",
                      query: { id: category.id },
                    }}
                  >
                    <DotsVerticalIcon></DotsVerticalIcon>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
