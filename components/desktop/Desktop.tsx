'use client';

import React from 'react';
import { useOSStore } from '@/lib/store/os-store';
import { apps } from '@/lib/utils/apps';
import { DesktopIcon } from '@/types';

export default function Desktop() {
  const { desktopIcons, openWindow } = useOSStore();

  const handleIconDoubleClick = (icon: DesktopIcon) => {
    if (icon.type === 'app' && icon.appId) {
      const app = apps.find((a) => a.id === icon.appId);
      if (app) {
        openWindow({
          title: app.name,
          appId: app.id,
          position: { x: 100, y: 100 },
          size: app.defaultSize,
          icon: app.icon,
        });
      }
    }
  };

  return (
    <div className="absolute inset-0 p-4">
      <div className="grid grid-cols-8 gap-4 auto-rows-min">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center gap-1 cursor-pointer select-none hover:bg-white/10 p-2 rounded transition-colors"
            onDoubleClick={() => handleIconDoubleClick(icon)}
          >
            <div className="text-4xl">{icon.icon}</div>
            <span className="text-white text-xs text-center drop-shadow-lg font-medium">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
