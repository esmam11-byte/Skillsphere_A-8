"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import coursesData from "@/data/courses.json";
import { Star, Clock, User, BookOpen, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = parseInt(params.id);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    // Find the course from our data
    const foundCourse = coursesData.courses.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      toast.error("Course not found");
    }
    setLoading(false);
  }, [courseId]);

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success(`Successfully enrolled in ${course?.title}!`);
  };

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Course Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The course you're looking for doesn't exist.
        </p>
        <Link href="/courses" className="btn btn-primary">
          Browse All Courses
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/courses" className="btn btn-ghost btn-sm mb-6">
          ← Back to Courses
        </Link>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-500">(1,234 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-5 h-5 text-gray-500" />
                <span>{course.instructor}</span>
              </div>
              <div className="badge badge-primary">{course.level}</div>
              <div className="badge badge-secondary">{course.category}</div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {course.description}
            </p>
            <button onClick={handleEnroll} className="btn btn-primary btn-lg w-full lg:w-auto">
              {enrolled ? "✓ Enrolled" : "Enroll Now"}
            </button>
          </div>
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
              </figure>
              <div className="card-body">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">Free</p>
                  <p className="text-sm text-gray-500">Full lifetime access</p>
                </div>
                <div className="divider"></div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {course.duration} of video content
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Certificate of completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Curriculum */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="space-y-3">
                {course.curriculum && course.curriculum.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </div>
                    <span className="text-sm text-gray-500">Preview</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Instructor */}
        <div>
          <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={`https://ui-avatars.com/api/?background=6366f1&color=fff&name=${course.instructor}`} alt={course.instructor} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{course.instructor}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Expert {course.category} Instructor</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                {course.instructor} is a passionate educator with years of experience in {course.category}. 
                They have taught thousands of students worldwide and are dedicated to helping you succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}