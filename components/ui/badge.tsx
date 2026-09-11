import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[--muted-bg] text-[--muted]",
        success: "bg-success-100 text-success-500",
        warning: "bg-warning-100 text-warning-500",
        danger: "bg-danger-100 text-danger-500",
        info: "bg-info-100 text-info-500",
        gold: "bg-gold-100 text-gold-600",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
