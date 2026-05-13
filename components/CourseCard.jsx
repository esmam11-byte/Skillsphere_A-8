import Link from "next/link";
import { Star } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="h-48 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg line-clamp-1">{course.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-semibold">{course.rating}</span>
          </div>
          <span className="text-xs text-gray-500">• {course.level}</span>
          <span className="text-xs text-gray-500">• {course.duration}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
          {course.description}
        </p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
