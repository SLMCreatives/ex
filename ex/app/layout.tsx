import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Exam Scheduler",
  description: "A simple app to schedule exams"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />

            <main className="min-h-screen flex flex-col items-center">
              <div className="flex flex-col lg:gap-20 items-start">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                      {/*                       <Link href={"/"}>Exam Scheduler</Link>
                       */}
                      <SidebarTrigger />
                      <ThemeSwitcher />
                    </div>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </nav>
                <div className="flex flex-col max-w-[100vw] p-5">
                  {children}
                </div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-6">
                  <p>
                    Powered by{" "}
                    <a
                      href="https://slmcreatives.com"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      SLM Creatives
                    </a>
                  </p>
                </footer>
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
