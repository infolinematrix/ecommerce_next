import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { DashboardSidebarSheet } from "./components/dashboard-sidebar-sheet";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./components/page-header";
import { Shell } from "./components/shell";
import { SidebarProvider } from "./components/sidebar-provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar
          storeId="storeId"
          className="top-0 z-30 hidden flex-col gap-4 lg:sticky lg:block"
        >
          {/* <StoreSwitcher
            userId={user.id}
            storesPromise={storesPromise}
            planMetricsPromise={planMetricsPromise}
          /> */}
          <div>s</div>
        </DashboardSidebar>
        <div className="flex flex-col">
          <DashboardHeader storeId="storeId">
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar storeId="storeId">
                {/* <StoreSwitcher
                  userId={user.id}
                  storesPromise={storesPromise}
                  planMetricsPromise={planMetricsPromise}
                /> */}
                <div>Store ID</div>
              </DashboardSidebar>
            </DashboardSidebarSheet>
          </DashboardHeader>
          <main className="flex-1 overflow-hidden p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
