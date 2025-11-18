'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';
import { Search, Shield } from 'lucide-react';

export default function VideoPlayer({ windowId: _windowId }: AppProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [videoId, setVideoId] = useState('');

  const kidsSafeVideos = [
    { id: 'dQw4w9WgXcQ', title: 'Fun Learning Video', thumbnail: '🎓' },
    { id: 'kffacxfA7G4', title: 'Animal Adventures', thumbnail: '🦁' },
    { id: 'OPf0YbXqDm0', title: 'Science for Kids', thumbnail: '🔬' },
    { id: 'C0DPdy98e4c', title: 'Music Time', thumbnail: '🎵' },
  ];

  const handleVideoSelect = (id: string) => {
    setVideoId(id);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 bg-gray-800 border-b border-gray-700">
        <Shield size={20} className="text-green-500" />
        <h2 className="text-white font-semibold">Kid-Safe Video Player</h2>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search kid-safe videos..."
            className="flex-1 bg-transparent text-white outline-none text-sm"
          />
        </div>
      </div>

      {/* Video Player / Content */}
      <div className="flex-1 overflow-hidden">
        {videoId ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 bg-gray-800">
              <button
                onClick={() => setVideoId('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Videos
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4">
            <h3 className="text-white font-semibold mb-4">
              Recommended Kid-Safe Videos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {kidsSafeVideos
                .filter((video) =>
                  video.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(video.id)}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <span className="text-6xl">{video.thumbnail}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-white font-medium text-sm mb-1">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Shield size={12} className="text-green-500" />
                        <span>Kid-Safe</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
