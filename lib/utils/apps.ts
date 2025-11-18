import { AppConfig } from '@/types';
import FileExplorer from '@/components/apps/FileExplorer';
import TextEditor from '@/components/apps/TextEditor';
import Calculator from '@/components/apps/Calculator';
import Browser from '@/components/apps/Browser';
import VideoPlayer from '@/components/apps/VideoPlayer';
import ImageViewer from '@/components/apps/ImageViewer';

export const apps: AppConfig[] = [
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: '📁',
    component: FileExplorer,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: 'text-editor',
    name: 'Text Editor',
    icon: '📝',
    component: TextEditor,
    defaultSize: { width: 700, height: 500 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '🔢',
    component: Calculator,
    defaultSize: { width: 320, height: 480 },
    minSize: { width: 320, height: 480 },
    maxSize: { width: 320, height: 480 },
  },
  {
    id: 'browser',
    name: 'Kid Browser',
    icon: '🌐',
    component: Browser,
    defaultSize: { width: 900, height: 700 },
    minSize: { width: 600, height: 400 },
  },
  {
    id: 'video-player',
    name: 'Video Player',
    icon: '🎬',
    component: VideoPlayer,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 500, height: 400 },
  },
  {
    id: 'image-viewer',
    name: 'Image Viewer',
    icon: '🖼️',
    component: ImageViewer,
    defaultSize: { width: 700, height: 600 },
    minSize: { width: 400, height: 300 },
  },
];
