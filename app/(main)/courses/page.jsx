"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import Loader from "@/components/Loader";
import coursesData from "@/data/courses.json";
import { Search } from "lucide-react";

export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    setCourses(coursesData.courses);
    setFilteredCourses(coursesData.courses);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          All Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover our comprehensive collection of courses
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses by title..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          Found {filteredCourses.length} courses
        </p>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No courses found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}