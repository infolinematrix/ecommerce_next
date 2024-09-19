import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AttributeType } from "@/db/schema/attributes";
import { getAttributeById } from "@/lib/actions/attributes";

import { AttriubteStoreProvider } from "../lib/store";
import { UpdateForm } from "../components/form_update";
import { AttrubuteValuesForm } from "../components/attribute_values_form";

interface Props {
  searchParams: { id: string | undefined };
}

export default async function UpdatePage({ searchParams }: Props) {
  const attribute = await getAttributeById(searchParams.id || "");
  const values: string[] = [];

  attribute?.attribute_values.map((v: any) => {
    values.push(v.attribute_value.toString());
  });

  const initialState = {
    attribute: attribute,
    values: values,
  };

  // console.log("------- Initial Value-------", initialState);

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
            </div>
            <div className="pt-4">
              <AttriubteStoreProvider initState={initialState}>
                <UpdateForm />
              </AttriubteStoreProvider>
            </div>
          </ScrollArea>
        </div>
        <div className="flex w-1/3 hidden:md">Help</div>
      </div>
    </Shell>
  );
}

// export const AttributeForm = ({ data }: any) => {};

// export const AttributeValueList = ({ data }: any) => {
//   return (
//     <>
//       <div>List</div>
//     </>
//   );
// };
