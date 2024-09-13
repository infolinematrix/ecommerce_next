import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AttributeType } from "@/db/schema/attributes";
import { getAttributeById } from "@/lib/actions/attributes";
import Link from "next/link";
import { FormUpdate } from "../components/form_update";
import { any, string } from "zod";

interface Props {
  searchParams: { id: string | undefined };
}

export default async function UpdatePage({ searchParams }: Props) {
  const attrInfo = await getAttributeById(searchParams.id || "");

  const values: string[] = [];

  attrInfo?.attribute_values.map((v: any) => {
    values.push(v.attribute_value.toString());
  });

  if (attrInfo) {
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
                <FormUpdate attribute={attrInfo} attribute_values={values} />
              </div>
            </ScrollArea>
          </div>
          <div className="flex w-1/3 hidden:md">Help</div>
        </div>
      </Shell>
    );
  }
  return <div>NO DATA..........</div>;
}

export const AttributeForm = ({ data }: any) => {
  const attribute: AttributeType = data;
  console.log("-----------------", attribute!);
  if (!attribute) return <></>;
  return <>{/* <FormUpdate data={attribute} /> */}</>;
};

export const AttributeValueList = ({ data }: any) => {
  return (
    <>
      <div>List</div>
    </>
  );
};
