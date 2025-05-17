
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, FileText, MessageSquare, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkflowTemplate } from "@/types";

// Lucide Icon-Mapping
const iconMap: Record<string, React.ReactNode> = {
  "mail": <Mail className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  "message-square": <MessageSquare className="h-5 w-5" />,
  "search": <Search className="h-5 w-5" />,
  "check": <Check className="h-5 w-5" />,
};

// Kategorie-Farben
const categoryColors: Record<string, string> = {
  "Marketing": "bg-pink-100 text-pink-800",
  "Sales": "bg-green-100 text-green-800",
  "Productivity": "bg-purple-100 text-purple-800",
  "Development": "bg-blue-100 text-blue-800",
  "Finance": "bg-yellow-100 text-yellow-800",
  "HR": "bg-orange-100 text-orange-800",
  "Other": "bg-gray-100 text-gray-800",
};

interface WorkflowCardProps {
  template: WorkflowTemplate;
  isSelected: boolean;
  onClick: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ template, isSelected, onClick }) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all overflow-hidden",
        isSelected 
          ? "border-nova-500 ring-2 ring-nova-200" 
          : "hover:shadow-md border-transparent"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={cn(
            "p-2 rounded-md",
            isSelected ? "bg-nova-100 text-nova-700" : "bg-gray-100 text-gray-600"
          )}>
            {iconMap[template.icon] || <FileText className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-1">{template.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.shortDescription}</p>
            <div className="mt-2">
              <Badge className={cn("text-xs font-medium", categoryColors[template.category] || "bg-gray-100 text-gray-800")}>
                {template.category}
              </Badge>
            </div>
          </div>
          {isSelected && (
            <div className="flex-shrink-0">
              <Check className="text-nova-500 h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
