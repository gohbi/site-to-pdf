'use client';

import React, { useState } from 'react';
import { AppProps } from '@/types';
import { Search, Shield, Home, AlertCircle } from 'lucide-react';

const SAFE_DOMAINS = [
  'pbskids.org',
  'kids.nationalgeographic.com',
  'nasa.gov',
  'wikipedia.org',
  'sciencekids.co.nz',
  'coolmath-games.com',
  'funbrain.com',
  'abcya.com',
];

export default function Browser({ windowId: _windowId }: AppProps) {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const isSafeDomain = (urlString: string) => {
    try {
      const domain = new URL(urlString).hostname.replace('www.', '');
      return SAFE_DOMAINS.some((safe) => domain.includes(safe));
    } catch {
      return false;
    }
  };

  const handleNavigate = () => {
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }

    if (isSafeDomain(fullUrl)) {
      setCurrentUrl(fullUrl);
      setIsBlocked(false);
    } else {
      setIsBlocked(true);
      setCurrentUrl('');
    }
  };

  const handleSafeSearch = () => {
    const searchQuery = url.trim();
    if (searchQuery) {
      setCurrentUrl(
        `https://www.google.com/search?q=${encodeURIComponent(
          searchQuery
        )}&safe=active`
      );
      setIsBlocked(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b">
        <button
          onClick={() => setCurrentUrl('')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
        >
          <Home size={18} />
        </button>
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border rounded-lg">
          <Shield size={16} className="text-green-600" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNavigate();
            }}
            placeholder="Enter safe website or search..."
            className="flex-1 outline-none text-sm"
          />
        </div>
        <button
          onClick={handleSafeSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Search size={16} />
          <span className="text-sm">Safe Search</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {!currentUrl && !isBlocked && (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <Shield size={64} className="text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Kid-Safe Browser
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              This browser only allows safe, kid-friendly websites. Try
              searching or visit approved sites!
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {SAFE_DOMAINS.slice(0, 6).map((domain) => (
                <button
                  key={domain}
                  onClick={() => {
                    setUrl(domain);
                    setCurrentUrl(`https://${domain}`);
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
                >
                  🌐 {domain}
                </button>
              ))}
            </div>
          </div>
        )}

        {isBlocked && (
          <div className="h-full flex flex-col items-center justify-center p-8 bg-red-50">
            <AlertCircle size={64} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Website Blocked
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              This website is not on the approved safe list. Please use the Safe
              Search button or visit one of the approved sites.
            </p>
          </div>
        )}

        {currentUrl && !isBlocked && (
          <iframe
            src={currentUrl}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title="Browser content"
          />
        )}
      </div>
    </div>
  );
}
