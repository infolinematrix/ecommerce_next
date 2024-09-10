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
import { getAttributes, deleteAttributeById } from "@/lib/actions/attributes";
import { AttributeType } from "@/db/schema/attributes";
import { DeleteAttributeButton } from "./components/delete_button";

// interface Props {
//   param: string;
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// const deleteAttr = async () => {
//   "use server";
//   console.log("====================");
// };

export default async function AttributePage() {
  const data = await getAttributes();
  data ?? console.log("NO DATA");

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-row gap-8 justify-between">
        <div className="flex w-2/3">
          <ScrollArea className="w-full pb-3.5">
            <div className="flex flex-row gap-4 justify-between">
              <PageHeader>
                <>
                  <PageHeaderHeading size="md">Attributes</PageHeaderHeading>
                  <PageHeaderDescription size="sm">
                    Manage your account settings
                  </PageHeaderDescription>
                </>
              </PageHeader>
              <>
                <Link href={"/admin/attributes/create"}>
                  <Button variant={"secondary"}>Create new </Button>
                </Link>
              </>
            </div>

            <div className="pt-4">
              {data && data.length > 0 ? (
                <>
                  <TableData data={data} />
                </>
              ) : (
                <div>No Data....</div>
              )}
              {/* <DataTable data /> */}
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}

const TableData = ({ data }: any) => {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Custom name</TableHead>
            <TableHead className="text-right w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((attribute: AttributeType) => (
            <TableRow key={attribute.id}>
              <TableCell className="font-medium">
                <span>{attribute.name}</span>
              </TableCell>
              <TableCell>
                <span>{attribute.input_type}</span>
              </TableCell>
              <TableCell>
                {attribute.custom_name == ""
                  ? attribute.name
                  : attribute.custom_name}
              </TableCell>
              <TableCell className="text-right">
                {/* <Button
                  asChild
                  variant={"secondary"}
                  className=""
                  type="submit"
                  onClick={(ev) => {
                    console.log("-------------");
                  }}
                >
                  <HomeIcon color="primary"></HomeIcon>
                </Button> */}
                <DeleteAttributeButton id={attribute.id} />
                {/* <Button variant={"ghost"}>
                    <HomeIcon></HomeIcon>
                  </Button> */}

                {/* <Button asChild variant={"secondary"} className="">
                  <Link
                    href={{
                      pathname: "/admin/attribute/update",
                      query: { id: attribute.id },
                    }}
                  >
                    <HomeIcon></HomeIcon>
                  </Link>
                </Button> */}
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
