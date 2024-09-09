import { ScrollArea } from "@/components/ui/scroll-area";
import {
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
import { HomeIcon } from "@radix-ui/react-icons";
import { CategoryType } from "@/db/schema/categories";

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
      <div className="flex flex-row gap-8 justify-between">
        <div className="flex w-2/3">
          <ScrollArea className="w-full pb-3.5">
            <div className="flex flex-row gap-4 justify-between">
              <PageHeader>
                <>
                  <PageHeaderHeading size="md">Categories</PageHeaderHeading>
                  <PageHeaderDescription size="sm">
                    Manage your account settings
                  </PageHeaderDescription>
                </>
              </PageHeader>
              <>
                <Link
                  href={{
                    pathname: "/admin/categories/create/",
                    query: { parent: searchParams.parent },
                  }}
                >
                  <Button variant={"secondary"}>Create new </Button>
                </Link>
              </>
            </div>
            {/* {data && data.length > 0 ? (
              <DataTable data />
            ) : (
              <div>Loading....</div>
            )} */}
            <div className="pt-4">
              <DataTable data={data} parent={searchParams.parent} />
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}

export const DataTable = ({ data }: any, parent: string | undefined) => {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
                {/* <Button variant={"secondary"} className="">
                  <HomeIcon />
                </Button> */}

                <Button asChild variant={"secondary"} className="">
                  <Link
                    href={{
                      pathname: "/admin/categories/update",
                      query: { id: category.id },
                    }}
                  >
                    <HomeIcon></HomeIcon>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
