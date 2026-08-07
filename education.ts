import { seededRandom, seededRange } from "./seed";
import type { KPI } from "@/types";

/** MOCK_EDUCATION_DATA — seeded placeholder. */
export interface Course {
  id: string;
  title: string;
  instructor: string;
  studentsEnrolled: number;
  completionRate: number;
  certificatesIssued: number;
  status: "Active" | "Upcoming" | "Completed";
}

const COURSES = [
  "Intro to Blockchain & Financial Inclusion",
  "Celo Wallet Fundamentals (Valora)",
  "Community Agent Certification",
  "Smart Contracts 101 (Solidity)",
  "Digital Literacy for Merchants",
  "Women in Web3 Bootcamp",
  "Youth Blockchain Ambassadors",
];

export function getEducationKpis(): KPI[] {
  return [
    { label: "Students Enrolled", value: 460, format: "number", delta: 15.6 },
    { label: "Active Courses", value: 5, format: "number" },
    { label: "Certificates Issued", value: 214, format: "number", delta: 9.1 },
    { label: "Avg. Completion Rate", value: 71, format: "percent", delta: 3.4 },
  ];
}

export function getCourses(): Course[] {
  const rand = seededRandom(70);
  const instructors = ["M. Dubic", "Community Instructor A", "Community Instructor B", "Guest Facilitator"];
  const statuses: Course["status"][] = ["Active", "Upcoming", "Completed"];
  return COURSES.map((title, i) => ({
    id: `MOCK-EDU-${600 + i}`,
    title,
    instructor: instructors[seededRange(rand, 0, instructors.length - 1)]!,
    studentsEnrolled: seededRange(rand, 20, 110),
    completionRate: seededRange(rand, 45, 92),
    certificatesIssued: seededRange(rand, 8, 70),
    status: statuses[seededRange(rand, 0, 2)]!,
  }));
}
