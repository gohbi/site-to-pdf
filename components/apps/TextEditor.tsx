'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';
import { Save, FileText } from 'lucide-react';

export default function TextEditor({ windowId: _windowId }: AppProps) {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          <Save size={16} />
          <span className="text-sm">Save</span>
        </button>
        <div className="flex items-center gap-2 flex-1">
          <FileText size={16} className="text-gray-600" />
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
          />
        </div>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-4 resize-none focus:outline-none font-mono text-sm"
        placeholder="Start typing..."
      />

      {/* Status Bar */}
      <div className="p-2 bg-gray-100 border-t text-xs text-gray-600 flex justify-between">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
}
