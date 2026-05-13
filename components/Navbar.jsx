"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
    };
    getSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            SkillSphere
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary transition ${
                  pathname === link.href ? "text-primary font-semibold" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 hover:text-primary">
                  <img
                    src={session.user.image || "https://ui-avatars.com/api/?background=6366f1&color=fff&name=" + session.user.name}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm hidden lg:inline">{session.user.name}</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
                <Link href="/register" className="btn btn-sm btn-outline">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 hover:text-primary ${
                  pathname === link.href ? "text-primary font-semibold" : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/profile" className="block py-2 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                  <User className="inline h-4 w-4 mr-2" />
                  My Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error w-full mt-2">
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 mt-2">
                <Link href="/login" className="btn btn-sm btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="btn btn-sm btn-outline w-full" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
