"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

interface CategoryBarChartProps {
  data: { label: string; value: number }[];
  colors?: string[];
  valueFormatter?: (v: number) => string;
}

const DEFAULT_COLORS = ["#0a1a30", "#14304f", "#275480", "#d9941f", "#f2ab34", "#f7c469"];

export function CategoryBarChart({ data, colors = DEFAULT_COLORS, valueFormatter }: CategoryBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip formatter={(v: number) => (valueFormatter ? valueFormatter(v) : v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
