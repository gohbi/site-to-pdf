// Core type definitions for KidOS

export interface WindowState {
  id: string;
  title: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  icon?: string;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<AppProps>;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
}

export interface AppProps {
  windowId: string;
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  content?: string | Blob;
  mimeType?: string;
  size?: number;
  createdAt: Date;
  modifiedAt: Date;
  icon?: string;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  type: 'app' | 'file' | 'folder';
  appId?: string;
  fileId?: string;
  position: { x: number; y: number };
}

export interface SafeSearchConfig {
  enabled: boolean;
  provider: 'google' | 'bing' | 'duckduckgo';
  strictMode: boolean;
  blockedDomains: string[];
  allowedDomains: string[];
}

export interface YouTubeConfig {
  enabled: boolean;
  kidsMode: boolean;
  allowedChannels: string[];
  blockedChannels: string[];
}
