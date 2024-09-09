import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";

import CreateForm from "../components/form_create";
import CreateAttributeForm from "../components/form_create";

export default function CreatePage() {
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
                    Manage your account settings
                  </PageHeaderDescription>
                </>
              </PageHeader>
            </div>
            <div className="pt-8">
              <CreateAttributeForm />
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
