"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { User, Image, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authClient.getSession();
      if (data) {
        setUser(data.user);
        setFormData({
          name: data.user.name || "",
          image: data.user.image || "",
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Simulate update (replace with actual API call)
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Not Logged In</h1>
        <Link href="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/profile" className="btn btn-ghost btn-sm mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center text-primary mb-6">
                Update Profile
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="input input-bordered w-full pl-10"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Profile Picture URL</span>
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      name="image"
                      placeholder="https://example.com/photo.jpg"
                      className="input input-bordered w-full pl-10"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Leave empty to use auto-generated avatar
                    </span>
                  </label>
                </div>

                {/* Preview */}
                {(formData.image || formData.name) && (
                  <div className="mt-6 p-4 bg-base-200 rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-2">Preview</p>
                    <div className="avatar">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={formData.image || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${formData.name}`}
                          alt="Preview"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <p className="mt-2 font-semibold">{formData.name || "Your Name"}</p>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={updating}
                  >
                    {updating ? "Updating..." : "Update Information"}
                  </button>
                  <Link href="/profile" className="btn btn-outline flex-1">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}