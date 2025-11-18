'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import { WindowState } from '@/types';
import { useOSStore } from '@/lib/store/os-store';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function Window({ window, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useOSStore();

  if (window.isMinimized) {
    return null;
  }

  const handleDragStop = (_e: unknown, d: { x: number; y: number }) => {
    updateWindowPosition(window.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    _e: unknown,
    _direction: unknown,
    ref: HTMLElement,
    _delta: unknown,
    position: { x: number; y: number }
  ) => {
    updateWindowSize(window.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    updateWindowPosition(window.id, position);
  };

  if (window.isMaximized) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-[calc(100vh-48px)] flex flex-col bg-white border border-gray-300 shadow-2xl"
        style={{ zIndex: window.zIndex }}
        onClick={() => focusWindow(window.id)}
      >
        <WindowTitleBar
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
        />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );
  }

  return (
    <Rnd
      default={{
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => focusWindow(window.id)}
    >
      <div className="w-full h-full flex flex-col bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden">
        <WindowTitleBar
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
        />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </Rnd>
  );
}

interface WindowTitleBarProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

function WindowTitleBar({
  window,
  onClose,
  onMinimize,
  onMaximize,
}: WindowTitleBarProps) {
  return (
    <div className="window-titlebar flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 cursor-move select-none">
      <div className="flex items-center gap-2">
        {window.icon && (
          <span className="text-xl">{window.icon}</span>
        )}
        <span className="font-medium text-sm">{window.title}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Minimize"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Maximize"
        >
          {window.isMaximized ? <Minimize2 size={16} /> : <Square size={16} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 hover:bg-red-500 rounded transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

function Minimize2({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  );
}
