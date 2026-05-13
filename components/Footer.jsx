import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">SkillSphere</h3>
            <p className="text-gray-400">
              Empowering learners worldwide with quality education and skill development programs.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-gray-400 hover:text-white transition">All Courses</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Popular Courses</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">New Releases</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@skillsphere.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white transition"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><Github className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SkillSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
