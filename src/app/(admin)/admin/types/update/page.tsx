import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoreProvider from "../lib/store";
import CreateForm from "../components/create_form";
import { get_type, get_types } from "@/lib/actions/types";
import { ListProperties } from "../components/list_properties";
import { getAttributes } from "@/lib/actions/attributes";
import { AddAttribute } from "../components/add_attributes";
import { AddAttributeForm } from "../components/add_attribute_form";

interface Props {
  searchParams: { [key: string]: string | string[] };
}

export default async function TypeUpdatePage({ searchParams }: Props) {
  const attributes = await getAttributes();
  const id = searchParams.id.toString();
  const type = await get_type(id);

  const initialState = {
    attributes: attributes,
    type: type,
    properties: type?.type_properties,
  };

  //   console.log("-------------------", initialState);

  return (
    <div>
      <Shell variant="sidebar" className="overflow-hidden">
        <div className="flex flex-row gap-8 justify-between">
          <div className="flex w-2/3">
            <ScrollArea className="w-full pb-3.5">
              <div className="flex flex-row gap-4 justify-between">
                <PageHeader>
                  <>
                    <PageHeaderHeading size="md">Type Create</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                      Manage your product types and attributes
                    </PageHeaderDescription>
                  </>
                </PageHeader>
                <></>
              </div>

              <div className="pt-4">
                <StoreProvider props={initialState}>
                  {/* <CreateForm />
                  <AddAttributeForm />
                  <ListProperties properties={type?.type_properties} /> */}
                  <AddAttributeForm />
                  <div>asdsad</div>
                </StoreProvider>

                {/* <TypesStoreProvider>
                  <div>Hello</div>
                </TypesStoreProvider> */}
              </div>
            </ScrollArea>
          </div>
          <div className="flex w-1/3 flex-col">
            <div>Help</div>
            <div></div>
          </div>
        </div>
      </Shell>
    </div>
  );
}
