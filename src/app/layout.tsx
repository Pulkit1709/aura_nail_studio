import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

const title = "Aura Nail Studio | Nail Extensions & Nail Art Courses in Sangrur";
const description =
  "Premium Nail Extensions, Gel Nails, Acrylic Nails, Nail Art Training, Bridal Nails & Makeup Services in Sangrur. Book appointments online.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-nail-studio.vercel.app"),
  title,
  description,
  keywords: [
    "Nail Studio Sangrur",
    "Nail Extension Sangrur",
    "Gel Nails Sangrur",
    "Acrylic Nails Sangrur",
    "Nail Art Course Sangrur",
    "Nail Academy Punjab",
  ],
  openGraph: {
    title,
    description,
    url: "https://aura-nail-studio.vercel.app",
    siteName: "Aura Nail Studio by Tisha",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "https://aura-nail-studio.vercel.app",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
