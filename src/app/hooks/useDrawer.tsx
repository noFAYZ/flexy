import React, { createContext, useContext, useState } from 'react';
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Create Drawer Context
const DrawerContext = createContext(null);

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerWidth, setDrawerWidth] = useState("md");
  const [onSave, setOnSave] = useState(null);

  const openDrawer = ({ content, title, width = "md", onSave = null }) => {
    setDrawerContent(content);
    setDrawerTitle(title);
    setDrawerWidth(width);
    setOnSave(() => onSave);
    setIsOpen(true);
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setDrawerContent(null);
    setDrawerTitle("");
    setOnSave(null);
    // Restore body scroll when drawer is closed
    document.body.style.overflow = 'unset';
  };

  // Define width classes based on size prop
  const getWidthClass = (size) => {
    const sizes = {
      sm: 'sm:w-[95%] sm:max-w-md',
      md: 'sm:w-[95%] sm:max-w-xl',
      lg: 'sm:w-[95%] sm:max-w-2xl',
      xl: 'sm:w-[95%] sm:max-w-3xl',
      '2xl': 'sm:w-[95%] sm:max-w-7xl',
      full: 'sm:w-[95%] sm:max-w-4xl'
    };
    return sizes[size] || sizes.md;
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 "
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`fixed inset-0 w-full h-full bg-background/95 transform z-50 
                ${getWidthClass(drawerWidth)}
                sm:h-full sm:inset-y-0 sm:right-0 sm:left-auto sm:rounded-l-[2.5rem] sm:bg-background
                overflow-hidden shadow-xl`}
            >
              <div className="h-full flex flex-col max-h-screen">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-divider flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
                  <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                    {drawerTitle}
                  </h2>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onClick={closeDrawer}
                    className="text-default-500"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                  {drawerContent}
                </div>

                {/* Footer */}
                {onSave && (
                  <div className="p-4 sm:p-6 border-t border-divider sticky bottom-0 bg-background/95 backdrop-blur-sm">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="light"
                        color="danger"
                        onClick={closeDrawer}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        onClick={() => {
                          onSave();
                          closeDrawer();
                        }}
                        size="sm"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
};

// Custom hook to use the drawer
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

