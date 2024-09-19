import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Slider, Button, Chip, RadioGroup, Radio, Select, SelectItem, Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, DollarSign, Star, RefreshCw, Filter, Zap, Briefcase, Clock, Award, SortAsc, ChevronLeft, ChevronRight } from 'lucide-react';

const accentColor = "rgb(249 115 22 / var(--tw-text-opacity))"; // Indigo-500 from Tailwind CSS

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryFilter: 'all',
    jobType: [],
    experienceLevel: [],
    clientRating: 0,
    budgetRange: [0, 15000],
    duration: 'any',
    sortBy: 'relevance',
    selectedTags: []
  });

  const [isOpen, setIsOpen] = useState(true);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      categoryFilter: 'all',
      jobType: [],
      experienceLevel: [],
      clientRating: 0,
      budgetRange: [0, 15000],
      duration: 'any',
      sortBy: 'relevance',
      selectedTags: []
    });
  };

  const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'Writing', 'Marketing'];
  const jobTypes = ['Hourly', 'Fixed-price', 'Long-term', 'Short-term'];
  const experienceLevels = ['Entry', 'Intermediate', 'Expert'];
  const durations = ['Less than 1 month', '1 to 3 months', '3 to 6 months', 'More than 6 months'];
  const popularTags = ['React', 'Node.js', 'Python', 'JavaScript', 'UI/UX', 'Machine Learning'];


  return (
    <motion.div
      initial={{ width: "35%" }}
      animate={{ width: isOpen ? "35%" : "60px", height: isOpen ? "100%" : "600px" }}
 
      transition={{ duration: 0.1 }}
      className="bg-muted/70 overflow-hidden rounded-3xl h-full border-medium border-default  relative"
      style={{ maxWidth: "400px" }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {isOpen && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-semibold flex items-center"
            >
              <Filter className="mr-2" size={20} />
              Filters
            </motion.h2>
          )}
          <div className="flex space-x-2 ml-auto mr-10">
            {isOpen && (
              <Button 
                isIconOnly 
                color="primary" 
                variant="light" 
                onPress={resetFilters}
                aria-label="Reset filters"
              >
                <RefreshCw size={18} />
              </Button>
            )}
          </div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion>
                <AccordionItem key="search" aria-label="Search" title="Search">
                  <Input
                    placeholder="Search jobs..."
                    value={filters.searchTerm}
                    onChange={(e) => updateFilter('searchTerm', e.target.value)}
                    startContent={<Search className="text-gray-400" size={18} />}
                    className="max-w-full"
                    classNames={{
                      input: "bg-muted",
                      inputWrapper: "bg-background data-[hover=true]:bg-background/50 group-data-[focus=true]:bg-background/80",
                    }}
                    styles={{
                      input: { 
                        '&:focus': { 
                          outlineColor: accentColor,
                        }
                      },
                    }}
                  />
                </AccordionItem>

                <AccordionItem key="category" aria-label="Category" title="Category">
                  <Select 
                    label="Select category" 
                    value={filters.categoryFilter}
                    onChange={(e) => updateFilter('categoryFilter', e.target.value)}
                    classNames={{
                      trigger: "bg-background data-[hover=true]:bg-background/50 group-data-[focus=true]:bg-background/80",
                      popoverContent:"bg-background data-[hover=true]:bg-background/50 group-data-[focus=true]:bg-background/80",
              
                    }}
                    styles={{
                      trigger: { 
                        '&:focus': { 
                          outlineColor: accentColor,
                        }
                      },
                    }}
                  >
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                    ))}
                  </Select>
                </AccordionItem>

                <AccordionItem key="jobType" aria-label="Job Type" title="Job Type">
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map(type => (
                      <Chip
                        key={type}
                        variant={filters.jobType.includes(type) ? "solid" : "bordered"}
                        onClick={() => {
                          updateFilter('jobType', filters.jobType.includes(type)
                            ? filters.jobType.filter(t => t !== type)
                            : [...filters.jobType, type]
                          );
                        }}
                        style={{
                          backgroundColor: filters.jobType.includes(type) ? accentColor : 'transparent',
                          color: filters.jobType.includes(type) ? 'white' : accentColor,
                          borderColor: accentColor,
                        }}
                      >
                        {type}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem key="experienceLevel" aria-label="Experience Level" title="Experience Level">
                  <div className="space-y-2">
                    {experienceLevels.map(level => (
                      <Checkbox
                        key={level}
                        isSelected={filters.experienceLevel.includes(level)}
                        onValueChange={(isSelected) => {
                          updateFilter('experienceLevel', isSelected 
                            ? [...filters.experienceLevel, level] 
                            : filters.experienceLevel.filter(l => l !== level)
                          );
                        }}
                        color="primary"
                        style={{ '--nextui-colors-primary': accentColor }}
                      >
                        {level}
                      </Checkbox>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem key="clientRating" aria-label="Client Rating" title="Client Rating">
                  <div className="flex items-center space-x-2">
                    <Slider
                      size="sm"
                      step={0.1}
                      maxValue={5}
                      minValue={0}
                      value={filters.clientRating}
                      onChange={(value) => updateFilter('clientRating', value)}
                      className="max-w-full"
                      color="primary"
                      style={{ '--nextui-colors-primary': accentColor }}
                    />
                    <div className="flex items-center">
                      <Star style={{ color: accentColor }} className="mr-1" size={18} />
                      <span className="text-sm font-semibold">{filters.clientRating.toFixed(1)}</span>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem key="budgetRange" aria-label="Budget Range" title="Budget Range">
                  <div className="space-y-4">
                    <Slider
                      size="sm"
                      step={100}
                      minValue={0}
                      maxValue={15000}
                      value={filters.budgetRange}
                      onChange={(value) => updateFilter('budgetRange', value)}
                      className="max-w-full"
                      color="primary"
                      style={{ '--nextui-colors-primary': accentColor }}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">${filters.budgetRange[0]}</span>
                      <span className="text-sm font-semibold">${filters.budgetRange[1]}</span>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem key="duration" aria-label="Project Duration" title="Project Duration">
                  <RadioGroup 
                    value={filters.duration} 
                    onValueChange={(value) => updateFilter('duration', value)}
                    color="primary"
                    style={{ '--nextui-colors-primary': accentColor }}
                  >
                    {durations.map(d => (
                      <Radio key={d} value={d}>{d}</Radio>
                    ))}
                  </RadioGroup>
                </AccordionItem>

                <AccordionItem key="sortBy" aria-label="Sort By" title="Sort By">
                  <Select 
                    label="Sort by"
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    classNames={{
                      trigger: "bg-muted",
                    }}
                    styles={{
                      trigger: { 
                        '&:focus': { 
                          outlineColor: accentColor,
                        }
                      },
                    }}
                  >
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="budget-high-to-low">Budget: High to Low</SelectItem>
                    <SelectItem value="budget-low-to-high">Budget: Low to High</SelectItem>
                  </Select>
                </AccordionItem>

                <AccordionItem key="popularTags" aria-label="Popular Tags" title="Popular Tags">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <Chip
                        key={tag}
                        variant={filters.selectedTags.includes(tag) ? "solid" : "bordered"}
                        className="cursor-pointer"
                        onClick={() => {
                          updateFilter('selectedTags', filters.selectedTags.includes(tag)
                            ? filters.selectedTags.filter(t => t !== tag)
                            : [...filters.selectedTags, tag]
                          );
                        }}
                        style={{
                          backgroundColor: filters.selectedTags.includes(tag) ? accentColor : 'transparent',
                          color: filters.selectedTags.includes(tag) ? 'white' : accentColor,
                          borderColor: accentColor,
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>

          {/* Toggle button outside of AnimatePresence */}
      <Button
        isIconOnly
        color="primary"
        variant="faded"
        onPress={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute top-4 -right-2 rounded-2xl bg-background z-40 overflow-visible"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </Button>
      </div>
    </motion.div>
  );
};

export default FilterSidebar;