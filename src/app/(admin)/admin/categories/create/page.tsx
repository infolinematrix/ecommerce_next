import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/app/(admin)/components/page-header";
import { Shell } from "@/app/(admin)/components/shell";
import { Button } from "@/components/ui/button";
import { get_parents } from "@/lib/actions/category";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import CreateForm from "../components/form_create";

interface Props {
  // param: string;
  // searchParams: { [key: string]: string | string[] | undefined };
  searchParams: { parent: string | undefined };
}
export default async function CreateCategoryPage({ searchParams }: Props) {
  // const parent = await get_category(searchParams.parent);

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-row gap-4 justify-between">
        <PageHeader>
          <>
            <PageHeaderHeading size="md">Create</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Create new category for your products.
            </PageHeaderDescription>
          </>
        </PageHeader>
        <>
          {/* <Link href={"#"}>
            <Button variant={"secondary"}>Create new </Button>
          </Link> */}
        </>
      </div>
      <div className="flex flex-row gap-8 justify-between">
        <div className="flex w-2/3">
          <ScrollArea className="w-full px-4">
            <CreateForm parentId={searchParams.parent} />
          </ScrollArea>
        </div>
        <div className="flex w-1/3">sad</div>
      </div>
    </Shell>
  );
}
