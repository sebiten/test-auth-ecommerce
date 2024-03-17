import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "@/utils/supabase/server";
import { titleFont } from "./config/fonts";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://test-auth-ecommerce.vercel.app";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tienda de ropa",
  description: "Tiend online",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={titleFont.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar user={user!} />
          <main className="min-h-screen flex flex-col items-center">
            <Toaster />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
