'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/store/os-store';
import { Menu, Clock } from 'lucide-react';
import { apps } from '@/lib/utils/apps';
import { AppConfig } from '@/types';

export default function Taskbar() {
  const { windows, openWindow, focusWindow, minimizeWindow } = useOSStore();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const windowCountRef = React.useRef(0);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (app: AppConfig) => {
    const basePosition = 100;
    const offset = (windowCountRef.current % 5) * 40;
    windowCountRef.current += 1;
    openWindow({
      title: app.name,
      appId: app.id,
      position: { x: basePosition + offset, y: basePosition + offset },
      size: app.defaultSize,
      icon: app.icon,
    });
    setShowStartMenu(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900 border-t border-gray-700 flex items-center px-2 gap-2 z-50">
        {/* Start Button */}
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
        >
          <Menu size={20} className="text-white" />
          <span className="text-white font-medium text-sm">Start</span>
        </button>

        {/* Running Apps */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() =>
                window.isMinimized
                  ? minimizeWindow(window.id)
                  : focusWindow(window.id)
              }
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                window.isMinimized
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {window.icon && <span className="text-lg">{window.icon}</span>}
              <span className="text-white text-sm max-w-[150px] truncate">
                {window.title}
              </span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 px-3 text-white">
          <Clock size={16} />
          <span className="text-sm font-medium">
            {currentTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowStartMenu(false)}
          />
          <div className="fixed bottom-12 left-2 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
              <h2 className="text-white font-bold text-lg">KidOS</h2>
              <p className="text-blue-100 text-sm">Kid-Safe Operating System</p>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app)}
                    className="flex flex-col items-center gap-2 p-3 hover:bg-gray-700 rounded transition-colors"
                  >
                    <span className="text-3xl">{app.icon}</span>
                    <span className="text-white text-sm text-center">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
