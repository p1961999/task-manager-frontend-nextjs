import { Card } from "@/components/shared/card";

interface DashboardStatsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const items = [
    { label: "Total Tasks", value: stats.total, color: "text-slate-900" },
    { label: "Completed", value: stats.completed, color: "text-slate-900" },
    { label: "In Progress", value: stats.inProgress, color: "text-green-600" },
    { label: "Overdue", value: stats.overdue, color: "text-red-600" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className={`mt-2 text-3xl font-bold ${item.color}`}>{item.value}</p>
        </Card>
      ))}
    </div>
  );
}