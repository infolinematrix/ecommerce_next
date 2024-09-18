import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { get_types, remove_type } from "@/lib/actions/types";
import { TypesType } from "@/db/schema/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { DeleteTypeButton } from "./components/delete_type_button";

export default async function TypesPage() {
  const types = await get_types();

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-row gap-8 justify-between">
        <div className="flex w-2/3">
          <ScrollArea className="w-full pb-3.5">
            <div className="flex flex-row gap-4 justify-between">
              <PageHeader>
                <>
                  <PageHeaderHeading size="md">Types</PageHeaderHeading>
                  <PageHeaderDescription size="sm">
                    Manage your product types and attributes
                  </PageHeaderDescription>
                </>
              </PageHeader>
              <>
                <Link href={"/admin/types/create"}>
                  <Button variant={"secondary"}>Create new </Button>
                </Link>
              </>
            </div>

            <div className="pt-4">
              <div>
                <Table>
                  <TableCaption>
                    {types && types.length > 0
                      ? "A list of your product types."
                      : "No data found..."}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>

                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {types &&
                      types.map((t: TypesType) => {
                        return (
                          <TableRow key={t.id}>
                            <TableCell className="font-medium">
                              <Link href={"/admin/types/update?id=" + t.id}>
                                {t.name}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <DeleteTypeButton id={t.id}></DeleteTypeButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
