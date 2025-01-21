// store/sidebar-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define all possible navigation routes
export type NavigationRoute = 
  | 'dashboard'
  | 'jobs'
  | 'contracts'
  | 'wallet'
  | 'community'
  | 'messages'
  | 'analytics'
  | 'settings';

interface NavigationState {
  // Current active route
  activeRoute: NavigationRoute;
  // Navigation view preference (can be 'sidebar' or 'navbar')
  navigationPreference: 'sidebar' | 'navbar';
  // Action to set active route
  setActiveRoute: (route: NavigationRoute) => void;
  // Action to toggle between sidebar and navbar
  toggleNavigationPreference: () => void;
  // Direct setter for navigation preference
  setNavigationPreference: (preference: 'sidebar' | 'navbar') => void;
}


interface SidebarState extends NavigationState {
  // Existing sidebar states
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
  isLeftSidebarCollapsed: boolean;
  
  // Existing actions
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  toggleLeftSidebarCollapse: () => void;
  
  // Existing setters
  setLeftSidebarOpen: (open: boolean) => void;
  setRightSidebarOpen: (open: boolean) => void;
  setLeftSidebarCollapsed: (collapsed: boolean) => void;
  
  // Reset function
  resetSidebarSettings: () => void;
}

const initialState = {
  // Existing sidebar initial states
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  isLeftSidebarCollapsed: false,
  
  // New navigation initial states
  activeRoute: 'dashboard' as NavigationRoute,
  navigationPreference: 'sidebar' as 'sidebar' | 'navbar',
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // Initial states
      ...initialState,

      // Navigation actions
      setActiveRoute: (route) => 
        set({ activeRoute: route }),
      
      toggleNavigationPreference: () =>
        set((state) => ({ 
          navigationPreference: state.navigationPreference === 'sidebar' ? 'navbar' : 'sidebar',
          // Automatically handle sidebar visibility when switching
          isLeftSidebarOpen: state.navigationPreference === 'navbar',
        })),
      
      setNavigationPreference: (preference) =>
        set({ 
          navigationPreference: preference,
          // Automatically handle sidebar visibility when switching
          isLeftSidebarOpen: preference === 'sidebar',
        }),

      // Existing sidebar actions
      toggleLeftSidebar: () =>
        set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
      
      toggleRightSidebar: () =>
        set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
      
      toggleLeftSidebarCollapse: () =>
        set((state) => ({ isLeftSidebarCollapsed: !state.isLeftSidebarCollapsed })),

      // Existing direct setters
      setLeftSidebarOpen: (open) =>
        set({ isLeftSidebarOpen: open }),
      
      setRightSidebarOpen: (open) =>
        set({ isRightSidebarOpen: open }),
      
      setLeftSidebarCollapsed: (collapsed) =>
        set({ isLeftSidebarCollapsed: collapsed }),

      // Reset to initial state
      resetSidebarSettings: () => set(initialState),
    }),
    {
      name: 'sidebar-settings',
      skipHydration: true,
    }
  )
);