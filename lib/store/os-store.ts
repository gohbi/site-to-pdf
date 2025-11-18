import { create } from 'zustand';
import { WindowState, DesktopIcon } from '@/types';

interface OSState {
  windows: WindowState[];
  desktopIcons: DesktopIcon[];
  nextZIndex: number;
  activeWindowId: string | null;
  
  // Window actions
  openWindow: (window: Omit<WindowState, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  
  // Desktop actions
  addDesktopIcon: (icon: DesktopIcon) => void;
  removeDesktopIcon: (id: string) => void;
  updateIconPosition: (id: string, position: { x: number; y: number }) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  desktopIcons: [],
  nextZIndex: 1,
  activeWindowId: null,
  
  openWindow: (window) => {
    const id = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const zIndex = get().nextZIndex;
    
    set((state) => ({
      windows: [...state.windows, { ...window, id, zIndex, isMinimized: false, isMaximized: false }],
      nextZIndex: zIndex + 1,
      activeWindowId: id,
    }));
  },
  
  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },
  
  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },
  
  focusWindow: (id) => {
    const zIndex = get().nextZIndex;
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex, isMinimized: false } : w
      ),
      nextZIndex: zIndex + 1,
      activeWindowId: id,
    }));
  },
  
  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
  
  addDesktopIcon: (icon) => {
    set((state) => ({
      desktopIcons: [...state.desktopIcons, icon],
    }));
  },
  
  removeDesktopIcon: (id) => {
    set((state) => ({
      desktopIcons: state.desktopIcons.filter((i) => i.id !== id),
    }));
  },
  
  updateIconPosition: (id, position) => {
    set((state) => ({
      desktopIcons: state.desktopIcons.map((i) =>
        i.id === id ? { ...i, position } : i
      ),
    }));
  },
}));
