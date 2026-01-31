'use client';

import { useEffect, useState } from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    }
    fetchVideos();
  }, []);

  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      // Handle different YouTube URL formats
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('watch?v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      return null;
    } catch {
      return null;
    }
  };

  const isLocalVideo = (url: string): boolean => {
    return url.startsWith('/uploads/videos/') || url.startsWith('/');
  };

  if (videos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>No videos available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => {
        const isLocal = isLocalVideo(video.youtube_url);
        const embedUrl = isLocal ? null : getYouTubeEmbedUrl(video.youtube_url);

        return (
          <div key={video.id} className="video-card">
            <div className="video-wrapper">
              {isLocal ? (
                <video
                  controls
                  className="w-full h-full object-cover rounded-lg"
                  style={{ aspectRatio: '16/9' }}
                >
                  <source src={video.youtube_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                  style={{ aspectRatio: '16/9' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                  <p className="text-gray-500">Invalid video URL</p>
                </div>
              )}
            </div>
            <div className="video-content">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
