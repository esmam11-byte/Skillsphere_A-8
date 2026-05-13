"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import CourseCard from "@/components/CourseCard";
import InstructorCard from "@/components/InstructorCard";
import Loader from "@/components/Loader";
import coursesData from "@/data/courses.json";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const instructors = [
  { name: "John Doe", role: "Web Development Expert", image: "https://randomuser.me/api/portraits/men/1.jpg", students: 15000 },
  { name: "Sarah Johnson", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/2.jpg", students: 12000 },
  { name: "Mike Chen", role: "Digital Marketing Guru", image: "https://randomuser.me/api/portraits/men/3.jpg", students: 10000 },
  { name: "Dr. Emily Brown", role: "AI Researcher", image: "https://randomuser.me/api/portraits/women/4.jpg", students: 8000 },
];

const learningTips = [
  "Break complex topics into smaller chunks",
  "Practice regularly for 25-30 minutes daily",
  "Take notes and revise them weekly",
  "Join study groups for collaborative learning",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(coursesData.courses);
    setLoading(false);
  }, []);

  const topCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const trendingCourses = [...courses].slice(3, 6);

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        className="h-[500px] md:h-[600px]"
      >
        <SwiperSlide>
          <div className="hero min-h-[500px] md:min-h-[600px]" style={{ backgroundImage: "url(https://picsum.photos/id/20/1920/600)" }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div>
                <h1 className="mb-5 text-5xl font-bold">Upgrade Your Skills Today 🚀</h1>
                <p className="mb-5">Learn from industry experts and advance your career</p>
                <Link href="/courses" className="btn btn-primary">Explore Courses</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="hero min-h-[500px] md:min-h-[600px]" style={{ backgroundImage: "url(https://picsum.photos/id/26/1920/600)" }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div>
                <h1 className="mb-5 text-5xl font-bold">Learn from Industry Experts 🎓</h1>
                <p className="mb-5">Get certified and boost your career with our courses</p>
                <Link href="/courses" className="btn btn-primary">Start Learning</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Popular Courses Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">🔥 Popular Courses</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Most loved courses by our students</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Trending Courses Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">📈 Trending Courses</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">New releases and trending topics</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tips Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">📌 Learning Tips</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Pro tips to enhance your learning journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningTips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h3 className="card-title text-lg">{tip}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Instructors Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">🏆 Top Instructors</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Learn from the best in the industry</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <InstructorCard key={index} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}