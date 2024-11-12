import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Input, Slider, Button, Chip, 
  Card, CardBody, Accordion, AccordionItem
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

const FilterSidebar = ({ onFilterChange, activeTab, filters, className = "", isMobile = false }) => {
  const [isOpen, setIsOpen] = React.useState(!isMobile);
  const currentFilters = { ...defaultFilters, ...filters };
  const [currentBudget, setCurrentBudget] = React.useState(currentFilters.budget);
  const [currentRating, setCurrentRating] = React.useState(currentFilters.rating);

  const updateFilter = (key, value) => {
    onFilterChange({
      type: activeTab,
      filters: { ...currentFilters, [key]: value }
    });
  };

  const resetFilters = () => {
    setCurrentBudget([0, 50000]);
    setCurrentRating(0);
    onFilterChange({
      type: activeTab,
      filters: defaultFilters
    });
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={`${className} ${
          isMobile 
            ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            : "relative"
        }`}
        initial={isMobile ? { opacity: 0, x: -100 } : false}
        animate={isMobile ? { opacity: 1, x: 0 } : {}}
        exit={isMobile ? { opacity: 0, x: -100 } : {}}
      >
        <Card className="h-full bg-background/60 backdrop-blur-xl border-medium border-default-200">
          <CardBody className="p-4 overflow-y-auto">
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => setIsOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {/* Search Input */}
              <Input
                label="Search Skills"
                placeholder="e.g. Solidity, React..."
                startContent={<Search size={18} />}
                value={currentFilters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                classNames={{
                  base: "bg-default-100/50",
                  inputWrapper: "hover:bg-default-200/50"
                }}
              />

              {/* Active Filters */}
              {Object.keys(currentFilters).some(key => 
                Array.isArray(currentFilters[key]) ? 
                currentFilters[key].length > 0 : 
                currentFilters[key]
              ) && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={resetFilters}
                    startContent={<RefreshCw size={14} />}
                  >
                    Reset All
                  </Button>
                  {currentFilters.projectType.map(type => (
                    <Chip
                      key={type}
                      onClose={() => {
                        const newTypes = currentFilters.projectType.filter(t => t !== type);
                        updateFilter('projectType', newTypes);
                      }}
                      variant="flat"
                      className="bg-orange-500/20 text-orange-500"
                    >
                      {type}
                    </Chip>
                  ))}
                </div>
              )}

              {/* Accordion Filters */}
              <Accordion 
                className="px-0 shadow-none"
                variant="bordered"
                defaultExpandedKeys={["type", "budget"]}
              >
                <AccordionItem
                  key="type"
                  aria-label="Project Type"
                  title={
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-orange-500" />
                      <span>Project Type</span>
                    </div>
                  }
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {projectTypes.map((type) => (
                      <Chip
                        key={type}
                        variant="flat"
                        classNames={{
                          base: currentFilters.projectType.includes(type) 
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : "bg-default-100 hover:bg-default-200",
                        }}
                        onClick={() => {
                          const newTypes = currentFilters.projectType.includes(type)
                            ? currentFilters.projectType.filter(t => t !== type)
                            : [...currentFilters.projectType, type];
                          updateFilter('projectType', newTypes);
                        }}
                      >
                        {type}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem
                  key="budget"
                  aria-label="Budget Range"
                  title={
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-orange-500" />
                      <span>Budget Range</span>
                    </div>
                  }
                >
                  <div className="px-1 pt-2">
                    <Slider
                      size="sm"
                      step={100}
                      minValue={0}
                      maxValue={50000}
                      value={currentBudget}
                      onChange={(value) => {
                        setCurrentBudget(value);
                        updateFilter('budget', value);
                      }}
                      classNames={{
                        track: "bg-default-500/30",
                        filledTrack: "bg-gradient-to-r from-orange-500 to-pink-500",
                        thumb: "bg-background border-2 border-orange-500",
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-default-500">${currentBudget[0]}</span>
                      <span className="text-sm text-default-500">${currentBudget[1]}</span>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  key="rating"
                  aria-label="Client Rating"
                  title={
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-orange-500" />
                      <span>Client Rating</span>
                    </div>
                  }
                >
                  <div className="flex items-center gap-4 pt-2">
                    <Slider
                      size="sm"
                      step={0.5}
                      minValue={0}
                      maxValue={5}
                      value={currentRating}
                      onChange={(value) => {
                        setCurrentRating(value);
                        updateFilter('rating', value);
                      }}
                      classNames={{
                        track: "bg-default-500/30",
                        filledTrack: "bg-gradient-to-r from-orange-500 to-pink-500",
                        thumb: "bg-background border-2 border-orange-500",
                      }}
                    />
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium">{currentRating}</span>
                    </div>
                  </div>
                </AccordionItem>

                {/* Add more accordion items for other filters */}
              </Accordion>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterSidebar;