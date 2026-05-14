"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { User, Mail, Edit, LogOut, BookOpen, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authClient.getSession();
      if (data) {
        setUser(data.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Not Logged In</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Please login to view your profile
        </p>
        <Link href="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body text-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.image || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${user.name}`}
                    alt={user.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link href="/profile/update" className="btn btn-primary btn-sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat bg-base-100 rounded-lg shadow-md">
              <div className="stat-figure text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="stat-title">Courses Enrolled</div>
              <div className="stat-value text-primary">3</div>
              <div className="stat-desc">2 in progress</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow-md">
              <div className="stat-figure text-secondary">
                <Star className="w-8 h-8" />
              </div>
              <div className="stat-title">Certificates</div>
              <div className="stat-value text-secondary">1</div>
              <div className="stat-desc">Earned this month</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow-md">
              <div className="stat-figure text-accent">
                <User className="w-8 h-8" />
              </div>
              <div className="stat-title">Learning Hours</div>
              <div className="stat-value text-accent">47</div>
              <div className="stat-desc">This week: 8 hours</div>
            </div>
          </div>

          {/* Account Info */}
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-semibold">Started: Complete Web Development Bootcamp</p>
                    <p className="text-sm text-gray-500">Progress: 25%</p>
                  </div>
                  <button className="btn btn-xs btn-primary">Continue</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-semibold">Completed: UI/UX Design Masterclass</p>
                    <p className="text-sm text-gray-500">Certificate available</p>
                  </div>
                  <button className="btn btn-xs btn-outline">View</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-semibold">Enrolled: Digital Marketing Pro</p>
                    <p className="text-sm text-gray-500">Started: 2 days ago</p>
                  </div>
                  <button className="btn btn-xs btn-primary">Start</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}