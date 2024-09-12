import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";

export default function TypesPage() {
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

            <div className="pt-4">{/* <TableData data={data} /> */}</div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
