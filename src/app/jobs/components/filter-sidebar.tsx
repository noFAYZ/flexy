import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Input, Slider, Button, Chip, 
  Card, CardBody, Accordion, AccordionItem,
  Divider
} from "@nextui-org/react";
import { 
  Search, DollarSign, Star, RefreshCw, 
  Filter, Briefcase, Clock, Target, 
  Award, Globe, Zap, X 
} from 'lucide-react';

// Default filter values
const defaultFilters = {
  searchTerm: '',
  projectType: [],
  complexity: [],
  duration: [],
  budget: [0, 50000],
  skills: [],
  rating: 0,
  verificationLevel: []
};

const projectTypes = ["Smart Contracts", "Design", "Cryptography", "NFT", "Data Science", "Security", "Core Development", "Community", "Economics"];

const complexityLevels = ["1", "2", "3", "4", "5"];

const durationOptions = ["1 week", "2 weeks", "1 month", "3 months", "6 months", "Ongoing"];

const commonSkills = ["Solidity", "React", "Node.js", "Python", "Rust", "Smart Contracts", "DeFi", "NFT", "Web3"];

const FilterContent = ({ currentFilters, onFilterChange }) => {
  const [currentBudget, setCurrentBudget] = React.useState(currentFilters.budget);

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search filters..."
        startContent={<Search size={18} />}
        value={currentFilters.searchTerm || ''}
        onChange={(e) => onFilterChange({ type: 'searchTerm', value: e.target.value })}
      />
      
      <Accordion>
        <AccordionItem key="project-type" title="Project Type">
          <div className="flex flex-wrap gap-2">
            {projectTypes.map((type) => (
              <Chip
                key={type}
                variant={currentFilters.projectType?.includes(type) ? "solid" : "bordered"}
                onClick={() => {
                  const newTypes = currentFilters.projectType?.includes(type)
                    ? currentFilters.projectType.filter(t => t !== type)
                    : [...(currentFilters.projectType || []), type];
                  onFilterChange({ type: 'projectType', value: newTypes });
                }}
              >
                {type}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem key="budget" title="Budget Range">
          <Slider
            label="Budget ($)"
            step={1000}
            minValue={0}
            maxValue={50000}
            value={currentBudget}
            onChange={setCurrentBudget}
            onChangeEnd={(value) => onFilterChange({ type: 'budget', value })}
            formatOptions={{ style: 'currency', currency: 'USD' }}
            className="max-w-md"
          />
        </AccordionItem>

        <AccordionItem key="complexity" title="Complexity Level">
          <div className="flex flex-wrap gap-2">
            {complexityLevels.map((level) => (
              <Chip
                key={level}
                variant={currentFilters.complexity?.includes(level) ? "solid" : "bordered"}
                onClick={() => {
                  const newLevels = currentFilters.complexity?.includes(level)
                    ? currentFilters.complexity.filter(l => l !== level)
                    : [...(currentFilters.complexity || []), level];
                  onFilterChange({ type: 'complexity', value: newLevels });
                }}
              >
                Level {level}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem key="duration" title="Duration">
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((duration) => (
              <Chip
                key={duration}
                variant={currentFilters.duration?.includes(duration) ? "solid" : "bordered"}
                onClick={() => {
                  const newDurations = currentFilters.duration?.includes(duration)
                    ? currentFilters.duration.filter(d => d !== duration)
                    : [...(currentFilters.duration || []), duration];
                  onFilterChange({ type: 'duration', value: newDurations });
                }}
              >
                {duration}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem key="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <Chip
                key={skill}
                variant={currentFilters.skills?.includes(skill) ? "solid" : "bordered"}
                onClick={() => {
                  const newSkills = currentFilters.skills?.includes(skill)
                    ? currentFilters.skills.filter(s => s !== skill)
                    : [...(currentFilters.skills || []), skill];
                  onFilterChange({ type: 'skills', value: newSkills });
                }}
              >
                {skill}
              </Chip>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const FilterSidebar = ({ onFilterChange, activeTab, filters, className = "", isMobile = false, isOpen, onClose }) => {
  const currentFilters = React.useMemo(() => ({ ...defaultFilters, ...filters }), [filters]);

  const handleReset = () => {
    onFilterChange({ type: 'reset', value: defaultFilters });
  };

  const filterContent = (
    <FilterContent
      currentFilters={currentFilters}
      onFilterChange={onFilterChange}
    />
  );

  if (isMobile) {
    return (
      <div className="lg:hidden">
        <div
          className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] bg-background rounded-t-3xl shadow-xl"
        >
          <div className="p-4 border-b">
            <div className="w-12 h-1.5 bg-default-300 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button 
                isIconOnly 
                variant="light" 
                onPress={onClose}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {filterContent}
          </div>
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                color="danger" 
                variant="flat" 
                onPress={handleReset}
              >
                Reset
              </Button>
              <Button 
                className="flex-1" 
                color="primary" 
                onPress={onClose}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`sticky top-6 ${className} rounded-[2.5rem]`}>
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            size="sm"
            variant="light"
            startContent={<RefreshCw size={16} />}
            onPress={handleReset}
          >
            Reset
          </Button>
        </div>
        {filterContent}
      </CardBody>
    </Card>
  );
};

export default FilterSidebar;