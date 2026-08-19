import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href: string;
}

export default function ToolCard({ name, description, category, icon: Icon, href }: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="card h-full hover:border-blue-300 transition-all">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {name}
              </h2>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <span className="inline-block mt-3 text-sm font-medium text-blue-600 group-hover:underline">
              Open Tool →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}