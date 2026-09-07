import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const fontMetadata: Metadata = {
  title: {
    default: "CeloHT Admin",
    template: "%s · CeloHT Admin",
  },
  description:
    "Operational control center for the CeloHT ecosystem - treasury, governance, education, community, and reforestation management.",
  robots: { index: false, follow: false },
};

export const metadata = fontMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
