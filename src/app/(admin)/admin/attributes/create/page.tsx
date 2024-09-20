import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import CreateAttributeForm from "../components/form_create";
import { AttriubteStoreProvider } from "../lib/store";

export default function CreatePage() {
  const initialState = {
    attribute: {},
    values: [],
  };
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
                    Manage your product attributes settings
                  </PageHeaderDescription>
                </>
              </PageHeader>
            </div>
            <div className="pt-8">
              <AttriubteStoreProvider initState={initialState}>
                <CreateAttributeForm />
              </AttriubteStoreProvider>
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
