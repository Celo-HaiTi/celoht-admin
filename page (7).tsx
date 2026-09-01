"use client";

import type { Metadata } from "next";
import type { ColumnDef } from "@tanstack/react-table";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MockDataBanner } from "@/components/dashboard/mock-data-banner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/dashboard/data-table";
import { isMockMode } from "@/lib/data-source";
import { getEducationKpis, getCourses, type Course } from "@/lib/mock-data/education";

export const metadata: Metadata = { title: "Education" };

const statusVariant: Record<Course["status"], "success" | "info" | "default"> = {
  Active: "success",
  Upcoming: "info",
  Completed: "default",
};

const columns: ColumnDef<Course, unknown>[] = [
  { accessorKey: "title", header: "Course" },
  { accessorKey: "instructor", header: "Instructor" },
  { accessorKey: "studentsEnrolled", header: "Enrolled" },
  { accessorKey: "completionRate", header: "Completion", cell: ({ row }) => `${row.original.completionRate}%` },
  { accessorKey: "certificatesIssued", header: "Certificates" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge> },
];

export default function EducationDashboard() {
  const mock = isMockMode();
  return (
    <div>
      {mock && <MockDataBanner />}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {getEducationKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </div>
      <Card className="mt-6">
        <CardHeader><div><CardTitle>Courses</CardTitle><CardDescription>Enrollment, completion, and certification by course</CardDescription></div></CardHeader>
        <CardContent><DataTable title="Courses" data={getCourses()} columns={columns} exportFilename="celoht-education-courses" /></CardContent>
      </Card>
    </div>
  );
}
