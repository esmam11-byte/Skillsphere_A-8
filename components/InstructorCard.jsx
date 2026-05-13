import { Users } from "lucide-react";

export default function InstructorCard({ instructor }) {
  return (
    <div className="card bg-base-100 shadow-xl text-center">
      <figure className="px-6 pt-6">
        <img src={instructor.image} alt={instructor.name} className="rounded-full w-32 h-32 object-cover mx-auto" />
      </figure>
      <div className="card-body">
        <h3 className="card-title justify-center">{instructor.name}</h3>
        <p className="text-sm text-primary font-semibold">{instructor.role}</p>
        <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{instructor.students.toLocaleString()} students</span>
        </div>
      </div>
    </div>
  );
}
