import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@nextui-org/button";
import { Input,  } from "@nextui-org/react";
import { SelectTrigger, SelectValue, SelectContent } from "@radix-ui/react-select";
import { Globe, Plus, Trash2 } from "lucide-react";

import { useState } from "react";
import { availableIcons } from "../../lib/utils";

// QuickFactsEditor component with responsive improvements
export const QuickFactsEditor = ({ quickFacts = [], onChange }) => {
    const [facts, setQuickFacts] = useState(quickFacts);

    const addQuickFact = () => {
      if (facts.length < 4) {
        const newQuickFacts = [
          ...facts,
          { icon: 'Globe', title: '', value: '' }
        ];
        setQuickFacts(newQuickFacts);
      }
    };

    const removeQuickFact = (index) => {
      const newQuickFacts = facts.filter((_, i) => i !== index);
      setQuickFacts(newQuickFacts)
    };
  
    const updateQuickFact = (index, field, value) => {
      const newQuickFacts = [...facts];
      newQuickFacts[index] = {
        ...newQuickFacts[index],
        [field]: value
      };
      setQuickFacts(newQuickFacts)
    };
  
    const IconComponent = ({ iconName }) => {
      const IconFound = availableIcons.find(i => i.label === iconName)?.icon;
      return IconFound ? <IconFound size={16} /> : <Globe size={16} />;
    };
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-base sm:text-lg font-medium">
            Quick Facts
          </label>
          <Button
            size="sm"
            variant="flat"
            onClick={addQuickFact}
            disabled={facts.length >= 4}
            className="bg-gradient-to-br from-orange-500 to-pink-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Fact
          </Button>
        </div>
     
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact, index) => (
            <div 
              key={index}
              className="p-3 sm:p-4 bg-card rounded-lg border"
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-sm font-medium">
                  Fact {index + 1}
                </h3>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => removeQuickFact(index)}
                  className="text-destructive hover:text-destructive/90 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
  
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Icon
                  </label>
                  <Select
                    value={fact.icon}
                    onValueChange={(value) => updateQuickFact(index, 'icon', value)}
                  >
                    <SelectTrigger className="focus:ring-none">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <IconComponent iconName={fact.icon} />
                          {fact.icon}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((iconOption) => (
                        <SelectItem key={iconOption.label} value={iconOption.label}>
                          <div className="flex items-center gap-2">
                            <iconOption.icon className="w-4 h-4" />
                            {iconOption.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
  
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Title
                  </label>
                  <Input
                    value={fact.title}
                    onChange={(e) => updateQuickFact(index, 'title', e.target.value)}
                    placeholder="Enter title"
                  />
                </div>
  
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Value
                  </label>
                  <Input
                    value={fact.value}
                    onChange={(e) => updateQuickFact(index, 'value', e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {facts.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-muted-foreground">
            No quick facts added. Click "Add Fact" to start.
          </div>
        )}
      </div>
    );
};
