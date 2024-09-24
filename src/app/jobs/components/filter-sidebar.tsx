import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Slider, Button, Chip, Switch, Tabs, Tab, Tooltip } from "@nextui-org/react";
import { Search, DollarSign, Star, RefreshCw, Filter, Briefcase, ChevronLeft, ChevronRight, User, Zap } from 'lucide-react';
import { FluentBriefcase20Filled, MingcuteUser3Fill } from '@/components/icons/icons';

const FilterSidebar = ({ onFilterChange, activeTab, filters }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const updateFilter = (key, value) => {
    onFilterChange({
      type: activeTab,
      filters: { ...filters, [key]: value }
    });
  };

  const resetFilters = () => {
    onFilterChange({
      type: activeTab,
      filters: activeTab === 'jobs' ? {
        searchTerm: '',
        categoryFilter: 'all',
        jobType: [],
        experienceLevel: [],
        clientRating: 0,
        budgetRange: [0, 35000],
        duration: 'any',
        sortBy: 'relevance',
        selectedTags: []
      } : {
        searchTerm: '',
        skills: [],
        experienceLevel: [],
        hourlyRate: [0, 150],
        rating: 0,
      }
    });
  };

  const categories = ['All', 'Web', 'Mobile', 'UI/UX', 'Data', 'Writing', 'Marketing'];
  const jobTypes = ['Hourly', 'Fixed', 'Long-term', 'Short-term'];
  const experienceLevels = ['Entry', 'Intermediate', 'Expert'];

  return (
    <motion.div
      initial={{ width: "300px" }}
      animate={{ width: isOpen ? "300px" : "60px" }}
      transition={{ duration: 0.1 }}
      className="bg-background/80 backdrop-blur-md overflow-hidden rounded-2xl h-full border border-divider   min-w-[300px] shadow-lg"
    >
      <div className="flex flex-col h-full">
        <motion.div 
          className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4"
          animate={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="mr-2 text-primary" size={24} />
              Filters
            </h2>
            <Tooltip content="Reset Filters">
              <Button 
                isIconOnly 
                color="primary" 
                variant="light" 
                onPress={resetFilters}
                aria-label="Reset filters"
                className="relative right-6 overflow-hidden group"
              >
                <RefreshCw size={18} className="group-hover:scale-125 transition-transform duration-300" />
                <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
              </Button>
            </Tooltip>
          </div>
        </motion.div>

        {isOpen && (
          <div className="flex-grow overflow-y-auto custom-scrollbar p-4">
            {activeTab === 'jobs' ? (
              <JobFilters filters={filters} updateFilter={updateFilter} categories={categories} jobTypes={jobTypes} experienceLevels={experienceLevels} />
            ) : (
              <FreelancerFilters filters={filters} updateFilter={updateFilter} experienceLevels={experienceLevels} />
            )}
          </div>
        )}

        <Tooltip content={isOpen ? "Collapse sidebar" : "Expand sidebar"} placement="right">
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onPress={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="absolute top-4 -right-3 rounded-l-full shadow-lg hover:scale-110 transition-transform"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};

const JobFilters = ({ filters, updateFilter, categories, jobTypes, experienceLevels }) => (
  <div className="space-y-6 mt-4">


    <div>
      <h3 className="text-sm font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Chip
              variant={filters.categoryFilter === category.toLowerCase() ? "solid" : "flat"}
              onClick={() => updateFilter('categoryFilter', category.toLowerCase())}
              color="primary"
              className="transition-all duration-300 hover:shadow-md"
            >
              {category}
            </Chip>
          </motion.div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2">Job Type</h3>
      <div className="flex flex-wrap gap-2">
        {jobTypes.map(type => (
          <motion.div key={type} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Chip
              variant={filters.jobType.includes(type) ? "solid" : "flat"}
              onClick={() => {
                updateFilter('jobType', filters.jobType.includes(type)
                  ? filters.jobType.filter(t => t !== type)
                  : [...filters.jobType, type]
                );
              }}
              color="primary"
              className="transition-all duration-300 hover:shadow-md"
            >
              {type}
            </Chip>
          </motion.div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2">Experience Level</h3>
      <div className="flex flex-wrap gap-4">
        {experienceLevels.map(level => (
          <Switch
            key={level}
            size="sm"
            color="primary"
            isSelected={filters.experienceLevel.includes(level)}
            onValueChange={(isSelected) => {
              updateFilter('experienceLevel', isSelected 
                ? [...filters.experienceLevel, level] 
                : filters.experienceLevel.filter(l => l !== level)
              );
            }}
          >
            {level}
          </Switch>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2">Budget Range</h3>
      <Slider
        size="sm"
        step={100}
        minValue={0}
        maxValue={35000}
        value={filters.budgetRange}
        onChange={(value) => updateFilter('budgetRange', value)}
        className="max-w-full"
        startContent={<DollarSign size={18} />}
        endContent={<DollarSign size={18} />}
      />
      <div className="flex justify-between mt-2">
        <span className="text-sm">${filters.budgetRange[0]}</span>
        <span className="text-sm">${filters.budgetRange[1]}</span>
      </div>
    </div>
  </div>
);

const FreelancerFilters = ({ filters, updateFilter, experienceLevels }) => (
  <div className="space-y-6 mt-4">


    <div>
      <h3 className="text-sm font-semibold mb-2">Experience Level</h3>
      <div className="flex flex-wrap gap-4">
        {experienceLevels.map(level => (
          <Switch
            key={level}
            size="sm"
            color="primary"
            isSelected={filters.experienceLevel.includes(level)}
            onValueChange={(isSelected) => {
              updateFilter('experienceLevel', isSelected 
                ? [...filters.experienceLevel, level] 
                : filters.experienceLevel.filter(l => l !== level)
              );
            }}
          >
            {level}
          </Switch>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2">Hourly Rate</h3>
      <Slider
        size="sm"
        step={5}
        minValue={0}
        maxValue={150}
        value={filters.hourlyRate}
        onChange={(value) => updateFilter('hourlyRate', value)}
        className="max-w-full"
        startContent={<DollarSign size={18} />}
        endContent={<DollarSign size={18} />}
      />
      <div className="flex justify-between mt-2">
        <span className="text-sm">${filters.hourlyRate[0]}/hr</span>
        <span className="text-sm">${filters.hourlyRate[1]}/hr</span>
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2">Rating</h3>
      <div className="flex items-center space-x-2">
        <Slider
          size="sm"
          step={0.5}
          maxValue={5}
          minValue={0}
          value={filters.rating}
          onChange={(value) => updateFilter('rating', value)}
          className="max-w-full"
        />
        <div className="flex items-center">
          <Star size={18} />
          <span className="text-sm font-semibold ml-1">{filters.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  </div>
);

export default FilterSidebar;