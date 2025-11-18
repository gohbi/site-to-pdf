'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';
import { Folder, Home } from 'lucide-react';

export default function FileExplorer({ windowId: _windowId }: AppProps) {
  const [currentPath, setCurrentPath] = useState('/');
  const [files] = useState([
    { name: 'Documents', type: 'folder', icon: '📄' },
    { name: 'Pictures', type: 'folder', icon: '🖼️' },
    { name: 'Videos', type: 'folder', icon: '🎬' },
    { name: 'Downloads', type: 'folder', icon: '⬇️' },
    { name: 'My Drawing.png', type: 'file', icon: '🖼️' },
    { name: 'Story.txt', type: 'file', icon: '📝' },
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 bg-white border-b">
        <button className="p-2 hover:bg-gray-100 rounded">
          <Home size={18} />
        </button>
        <div className="flex-1 flex items-center gap-1 px-3 py-2 bg-gray-100 rounded">
          <Folder size={16} />
          <span className="text-sm">{currentPath}</span>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 rounded cursor-pointer border border-transparent hover:border-blue-200 transition-colors"
              onDoubleClick={() => {
                if (file.type === 'folder') {
                  setCurrentPath(`${currentPath}${file.name}/`);
                }
              }}
            >
              <span className="text-4xl">{file.icon}</span>
              <span className="text-sm text-center break-words w-full">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-white border-t text-sm text-gray-600">
        {files.length} items
      </div>
    </div>
  );
}
