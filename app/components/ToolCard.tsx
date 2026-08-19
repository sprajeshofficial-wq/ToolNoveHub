import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}

const ToolCard = ({ name, description, icon: Icon, href, color = 'from-indigo-500 to-purple-500' }: ToolCardProps) => {
  return (
    <Link href={href} className="group">
      <div className="tool-card">
        {/* Icon */}
        <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${color} p-3 shadow-lg shadow-${color.split(' ')[0]}/25`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {description}
        </p>

        {/* Learn More */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
          <span>Try Tool</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;