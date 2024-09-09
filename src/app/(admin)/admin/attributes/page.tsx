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
import { getAttributes } from "@/lib/actions/attributes";

// interface Props {
//   param: string;
//   searchParams: { [key: string]: string | string[] | undefined };
// }

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
            {data && data.length > 0 ? (
              // <DataTable data />
              <></>
            ) : (
              <div>No Data....</div>
            )}
            {/* <DataTable data /> */}
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
