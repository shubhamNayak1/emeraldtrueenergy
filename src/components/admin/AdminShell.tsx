"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  Inbox,
  Hammer,
  ImagePlus,
  Star,
  Settings as SettingsIcon,
  LogOut,
  Loader2,
} from "lucide-react";
import clsx from "clsx";
import { Logo } from "../Logo";
import { useAuth } from "@/lib/auth";
import { auth } from "@/lib/firebase";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/services", label: "Services", icon: Hammer },
  { href: "/admin/projects", label: "Projects", icon: ImagePlus },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginRoute) {
      router.replace("/admin/login");
    }
    if (user && isAdmin && isLoginRoute) {
      router.replace("/admin");
    }
  }, [loading, user, isAdmin, isLoginRoute, router]);

  if (isLoginRoute) return <>{children}</>;

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Access denied</h1>
        <p className="mt-2 text-sm text-ink/60">
          Your account doesn't have admin access. Ask the owner to grant the
          <code className="mx-1 rounded bg-emerald-50 px-1.5 py-0.5 text-xs">admin</code>
          claim.
        </p>
        <button
          onClick={() => signOut(auth)}
          className="mt-6 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="mb-6 hidden lg:block">
          <Logo />
        </div>
        <nav className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-emerald-100 bg-white p-2 lg:flex-col lg:overflow-visible">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition whitespace-nowrap",
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-ink/70 hover:bg-emerald-50 hover:text-emerald-800",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => signOut(auth)}
            className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink/60 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </nav>
      </aside>

      <section className="min-w-0">{children}</section>
    </div>
  );
}
