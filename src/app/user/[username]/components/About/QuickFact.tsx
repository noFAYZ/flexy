import { Globe } from "lucide-react";
import { availableIcons } from "../../lib/utils";


  
  export  const QuickFact = ({ icon, title, value }) => {
    const IconComponent = availableIcons.find(i => i.label === icon)?.icon || Globe;
    
    return (
      <div className="flex items-center gap-3 bg-content2 rounded-xl p-4">
        <div className="p-2 rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-foreground/60">{title}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    );
  };