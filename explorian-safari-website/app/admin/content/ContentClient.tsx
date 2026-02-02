'use client';

import { useState } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  title: string | null;
  caption: string | null;
  category: string | null;
  order: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Video {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnailUrl: string | null;
  type: string;
  category: string | null;
  order: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ContentClientProps {
  initialGallery: GalleryImage[];
  initialVideos: Video[];
}

export default function ContentClient({ initialGallery, initialVideos }: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'videos'>('gallery');
  const [gallery, setGallery] = useState(initialGallery);
  const [videos, setVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);

  // Gallery states
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [imageFormData, setImageFormData] = useState({
    url: '',
    title: '',
    caption: '',
    category: '',
    order: gallery.length + 1,
    active: true,
  });

  // Video states
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [videoFormData, setVideoFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    order: videos.length + 1,
    active: true,
  });

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Add Gallery Image
  const addImage = async () => {
    if (!imageFormData.url.trim()) {
      alert('Image URL is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageFormData),
      });

      if (!response.ok) throw new Error('Failed to add image');

      const newImage = await response.json();
      setGallery([...gallery, newImage]);
      setShowAddImageModal(false);
      setImageFormData({
        url: '',
        title: '',
        caption: '',
        category: '',
        order: gallery.length + 2,
        active: true,
      });
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Failed to add image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Gallery Image
  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setGallery(gallery.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Image Active Status
  const toggleImageActive = async (image: GalleryImage) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/gallery/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !image.active }),
      });

      if (!response.ok) throw new Error('Failed to update image');

      const updated = await response.json();
      setGallery(gallery.map(img => img.id === image.id ? updated : img));
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image.');
    } finally {
      setLoading(false);
    }
  };

  // Add Video
  const addVideo = async () => {
    if (!videoFormData.url.trim() || !videoFormData.title.trim()) {
      alert('Title and URL are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...videoFormData,
          type: 'youtube',
        }),
      });

      if (!response.ok) throw new Error('Failed to add video');

      const newVideo = await response.json();
      setVideos([...videos, newVideo]);
      setShowAddVideoModal(false);
      setVideoFormData({
        title: '',
        description: '',
        url: '',
        category: '',
        order: videos.length + 2,
        active: true,
      });
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Failed to add video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Video
  const deleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete video');

      setVideos(videos.filter(vid => vid.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Failed to delete video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Video Active Status
  const toggleVideoActive = async (video: Video) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !video.active }),
      });

      if (!response.ok) throw new Error('Failed to update video');

      const updated = await response.json();
      setVideos(videos.map(vid => vid.id === video.id ? updated : vid));
    } catch (error) {
      console.error('Error updating video:', error);
      alert('Failed to update video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="mt-2 text-gray-600">Manage gallery images and videos</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-4 px-1 border-b-2 font-medium transition ${
              activeTab === 'gallery'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gallery Images ({gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-4 px-1 border-b-2 font-medium transition ${
              activeTab === 'videos'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            YouTube Videos ({videos.length})
          </button>
        </nav>
      </div>

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gallery Images</h2>
              <p className="text-sm text-gray-600 mt-1">Manage safari, wildlife, and landscape images</p>
            </div>
            <button
              onClick={() => setShowAddImageModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold"
            >
              + Add Image
            </button>
          </div>

          {gallery.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">No gallery images yet</p>
              <p className="text-sm text-gray-500 mt-1">Add your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={image.url}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                    {!image.active && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900 bg-opacity-75 text-white text-xs rounded">
                        Hidden
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{image.title || 'Untitled'}</h3>
                    {image.caption && <p className="text-sm text-gray-600 mb-2">{image.caption}</p>}
                    {image.category && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-3">
                        {image.category}
                      </span>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => toggleImageActive(image)}
                        disabled={loading}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded transition ${
                          image.active
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {image.active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        disabled={loading}
                        className="flex-1 px-3 py-2 text-sm font-medium bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">YouTube Videos</h2>
              <p className="text-sm text-gray-600 mt-1">Add YouTube videos of your safaris and adventures</p>
            </div>
            <button
              onClick={() => setShowAddVideoModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold"
            >
              + Add Video
            </button>
          </div>

          {videos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">No videos yet</p>
              <p className="text-sm text-gray-500 mt-1">Add your first YouTube video to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => {
                const videoId = getYouTubeId(video.url);
                return (
                  <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="aspect-video bg-gray-900 relative">
                      {videoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <span>Invalid YouTube URL</span>
                        </div>
                      )}
                      {!video.active && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900 bg-opacity-75 text-white text-xs rounded">
                          Hidden
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                      {video.description && <p className="text-sm text-gray-600 mb-2">{video.description}</p>}
                      {video.category && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-3">
                          {video.category}
                        </span>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => toggleVideoActive(video)}
                          disabled={loading}
                          className={`flex-1 px-3 py-2 text-sm font-medium rounded transition ${
                            video.active
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {video.active ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => deleteVideo(video.id)}
                          disabled={loading}
                          className="flex-1 px-3 py-2 text-sm font-medium bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add Image Modal */}
      {showAddImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Gallery Image</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={imageFormData.url}
                  onChange={(e) => setImageFormData({ ...imageFormData, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Enter the full URL of the image</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={imageFormData.title}
                  onChange={(e) => setImageFormData({ ...imageFormData, title: e.target.value })}
                  placeholder="e.g., Lions in Serengeti"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <textarea
                  value={imageFormData.caption}
                  onChange={(e) => setImageFormData({ ...imageFormData, caption: e.target.value })}
                  placeholder="Brief description of the image"
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={imageFormData.category}
                  onChange={(e) => setImageFormData({ ...imageFormData, category: e.target.value })}
                  placeholder="e.g., Wildlife, Mountains, Beaches"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="image-active"
                  checked={imageFormData.active}
                  onChange={(e) => setImageFormData({ ...imageFormData, active: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="image-active" className="ml-2 text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddImageModal(false)}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add YouTube Video</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={videoFormData.url}
                  onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Paste the full YouTube video URL</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="e.g., Serengeti Safari Adventure"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  placeholder="Brief description of the video"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={videoFormData.category}
                  onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                  placeholder="e.g., Safari, Mountain Trekking, Beach"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="video-active"
                  checked={videoFormData.active}
                  onChange={(e) => setVideoFormData({ ...videoFormData, active: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="video-active" className="ml-2 text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddVideoModal(false)}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={addVideo}
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
