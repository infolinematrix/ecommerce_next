import { Suspense } from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { DashboardSidebarSheet } from "./components/dashboard-sidebar-sheet";
import { SidebarProvider } from "./components/sidebar-provider";
import Loading from "./loading";
import { NavigationEvents } from "@/components/navigation-events";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar
          storeId="storeId"
          className="top-0 z-30 hidden flex-col gap-4 lg:sticky lg:block"
        >
          <div>s</div>
        </DashboardSidebar>

        <div className="flex flex-col">
          <DashboardHeader storeId="storeId">
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar storeId="storeId">
                <div>Store ID</div>
              </DashboardSidebar>
            </DashboardSidebarSheet>
          </DashboardHeader>
          <main className="flex-1 overflow-hidden p-6">
            <Suspense fallback={<Loading />}>
              {children}
              <NavigationEvents />
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
