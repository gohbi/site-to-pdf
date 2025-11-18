'use client';

import React, { useEffect } from 'react';
import { useOSStore } from '@/lib/store/os-store';
import Desktop from '@/components/desktop/Desktop';
import Window from '@/components/window/Window';
import Taskbar from '@/components/taskbar/Taskbar';
import { apps } from '@/lib/utils/apps';

export default function OS() {
  const { windows, addDesktopIcon, desktopIcons } = useOSStore();

  // Initialize desktop icons
  useEffect(() => {
    if (desktopIcons.length === 0) {
      apps.forEach((app, index) => {
        addDesktopIcon({
          id: `icon-${app.id}`,
          name: app.name,
          icon: app.icon,
          type: 'app',
          appId: app.id,
          position: {
            x: Math.floor(index / 4) * 120,
            y: (index % 4) * 120,
          },
        });
      });
    }
  }, [addDesktopIcon, desktopIcons.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
      <Desktop />
      
      {/* Windows */}
      {windows.map((window) => {
        const app = apps.find((a) => a.id === window.appId);
        if (!app) return null;
        
        const AppComponent = app.component;
        
        return (
          <Window key={window.id} window={window}>
            <AppComponent windowId={window.id} />
          </Window>
        );
      })}
      
      <Taskbar />
    </div>
  );
}
