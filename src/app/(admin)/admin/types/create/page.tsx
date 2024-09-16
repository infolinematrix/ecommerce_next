import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import CreateForm from "../components/create_form";
import { getAttributes } from "@/lib/actions/attributes";
import StoreProvider from "../lib/store";

export default async function TypeCreatePage() {
  const attributes = await getAttributes();

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-row gap-8 justify-between">
        <div className="flex w-2/3">
          <ScrollArea className="w-full pb-3.5">
            <div className="flex flex-row gap-4 justify-between">
              <PageHeader>
                <>
                  <PageHeaderHeading size="md">Create</PageHeaderHeading>
                  <PageHeaderDescription size="sm">
                    Manage your product types and attributes
                  </PageHeaderDescription>
                </>
              </PageHeader>
              <></>
            </div>

            <div className="pt-4">Form Start</div>

            <div className="pt-4">
              <StoreProvider data={attributes}>
                <CreateForm />
              </StoreProvider>
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3 flex-col">
          <div>Help</div>
          <div></div>
        </div>
      </div>
    </Shell>
  );
}
