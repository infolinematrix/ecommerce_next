import { ScrollArea } from "@/components/ui/scroll-area";
import { Shell } from "../../components/shell";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "../../components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: string;
  searchParams: { parent: string | undefined };
}
export default async function ProductsPage({ params, searchParams }: Props) {
  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 justify-between">
          <PageHeader>
            <PageHeaderHeading size="md">Products</PageHeaderHeading>
            <PageHeaderDescription size="sm">
              Manage yourproducts.
            </PageHeaderDescription>
          </PageHeader>

          <PageActions>
            <Link
              href={{
                pathname: "/admin/products/create/",
              }}
            >
              <Button variant={"secondary"}>Create new </Button>
            </Link>
          </PageActions>
        </div>

        <div>
          <ScrollArea className="w-full pb-3.5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 overflow-hidden">
              <div className="lg:col-span-2">asd</div>

              {/* -----------RIGHT------------------- */}
              <div className="hidden md:block min-h-screen border-l _bg-primary-foreground rounded-lg p-4">
                <div className="uppercase tracking-wide text-lg font-semibold">
                  Help
                </div>

                <p className="mt-2 text-slate-500">
                  Help & tutorial coming soon...
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Shell>
  );
}
