import React from 'react';
import { Input, Tabs, Tab } from "@nextui-org/react";
import { Search, Activity, BarChart } from 'lucide-react';
import { FluentBriefcase20Filled, MingcuteUser3Fill } from '@/components/icons/icons';

const JobsListHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  viewMode, 
  setViewMode, 
  activeTab, 
  setActiveTab, 
  handleFilterChange, 
  activeFilters 
}) => {
  const handleSearch = (value) => {
    setSearchTerm(value);
    handleFilterChange({
      type: activeTab,
      filters: { ...activeFilters[activeTab], searchTerm: value }
    });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    // Reset search term when switching tabs
    setSearchTerm('');
    // Apply the filters for the selected tab
    handleFilterChange({
      type: key,
      filters: {
        ...activeFilters[key],
        searchTerm: '' // Reset search term in filters as well
      }
    });
  };

  return (
    <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-4">
      <h2 className="text-2xl font-bold">Available {activeTab === 'jobs' ? 'Jobs' : 'Talent'}</h2>
      <div className="flex items-center space-x-4 flex-wrap justify-end">
        <Input
          placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'talent'}...`}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full sm:w-auto"
          startContent={<Search className="text-gray-400" size={18} />}
          classNames={{
            inputWrapper: [
              "bg-muted data-[hover=true]:bg-muted/50 group-data-[focus=true]:bg-muted/80",
            ],
          }}
        />
        <Tabs 
          aria-label="Options" 
          selectedKey={activeTab} 
          onSelectionChange={handleTabChange}
          className="w-auto rounded-xl border-2 border-foreground/50"
        >
          <Tab
            key="jobs"
            title={
              <div className="flex items-center space-x-2">
                <FluentBriefcase20Filled height={20} />
                <span className="hidden sm:inline">Jobs</span>
              </div>
            }
          />
          <Tab
            key="freelancers"
            title={
              <div className="flex items-center space-x-2">
                <MingcuteUser3Fill height={20} />
                <span className="hidden sm:inline">Talent</span>
              </div>
            }
          />
        </Tabs>
        <Tabs 
          aria-label="View options" 
          selectedKey={viewMode} 
          onSelectionChange={setViewMode} 
          className="w-auto rounded-xl border-2 border-foreground/50"
        >
          <Tab
            key="list"
            title={<Activity size={20} />}
          />
          <Tab
            key="grid"
            title={<BarChart size={20} />}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default JobsListHeader;