import { GuardRoutes } from "@/components/auth/dashboard-auth-guard";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuardRoutes>
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
    </GuardRoutes>
  );
}