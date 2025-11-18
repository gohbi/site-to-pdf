'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

export default function ImageViewer({ windowId: _windowId }: AppProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const sampleImages = [
    { id: 1, url: 'https://via.placeholder.com/600x400/FF6B6B/FFFFFF?text=Sample+Image+1', name: 'Drawing 1' },
    { id: 2, url: 'https://via.placeholder.com/600x400/4ECDC4/FFFFFF?text=Sample+Image+2', name: 'Photo 1' },
  ];

  const [currentImage, setCurrentImage] = useState(sampleImages[0]);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-white border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(400, zoom + 25))}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={() => setRotation((rotation + 90) % 360)}
            className="p-2 hover:bg-gray-100 rounded transition-colors ml-2"
            title="Rotate"
          >
            <RotateCw size={18} />
          </button>
        </div>
        <span className="text-sm text-gray-600">{currentImage.name}</span>
      </div>

      {/* Image Display */}
      <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-200 p-4">
        <img
          src={currentImage.url}
          alt={currentImage.name}
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transition: 'transform 0.2s ease',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          className="shadow-lg"
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 p-2 bg-white border-t overflow-x-auto">
        {sampleImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setCurrentImage(img)}
            className={`flex-shrink-0 w-20 h-20 cursor-pointer rounded overflow-hidden border-2 transition-all ${
              currentImage.id === img.id
                ? 'border-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
