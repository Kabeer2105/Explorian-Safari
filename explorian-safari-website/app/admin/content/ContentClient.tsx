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
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url');
  const [imageUploading, setImageUploading] = useState(false);

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
  const [videoUploadMode, setVideoUploadMode] = useState<'url' | 'upload'>('url');
  const [videoUploading, setVideoUploading] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Handle Image File Upload
  const handleImageFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'image');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setImageFormData({ ...imageFormData, url: data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  // Handle Video File Upload
  const handleVideoFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setVideoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'video');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setVideoFormData({ ...videoFormData, url: data.url });
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setVideoUploading(false);
    }
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Add Gallery Image</h2>
                <button
                  onClick={() => setShowAddImageModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Upload Mode Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex gap-4">
                  <button
                    onClick={() => setImageUploadMode('upload')}
                    className={`pb-3 px-1 border-b-2 font-medium transition ${
                      imageUploadMode === 'upload'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📁 Upload from Device
                  </button>
                  <button
                    onClick={() => setImageUploadMode('url')}
                    className={`pb-3 px-1 border-b-2 font-medium transition ${
                      imageUploadMode === 'url'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🔗 Image URL
                  </button>
                </nav>
              </div>

              {/* Upload from Device */}
              {imageUploadMode === 'upload' && (
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 hover:border-primary transition">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageFileUpload}
                    disabled={imageUploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center py-8"
                  >
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {imageUploading ? (
                      <p className="text-primary font-semibold">Uploading...</p>
                    ) : imageFormData.url ? (
                      <div className="text-center">
                        <p className="text-green-600 font-semibold mb-2">✓ Image uploaded successfully!</p>
                        <p className="text-sm text-gray-500">Click to upload a different image</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-700 font-semibold mb-2">Click to upload image</p>
                        <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP, GIF (Max 10MB)</p>
                      </div>
                    )}
                  </label>
                  {imageFormData.url && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <img src={imageFormData.url} alt="Preview" className="max-h-48 mx-auto rounded" />
                    </div>
                  )}
                </div>
              )}

              {/* Image URL Input */}
              {imageUploadMode === 'url' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={imageFormData.url}
                    onChange={(e) => setImageFormData({ ...imageFormData, url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  />
                  <p className="text-sm text-gray-500 mt-2">Enter the full URL of the image from the internet</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={imageFormData.title}
                  onChange={(e) => setImageFormData({ ...imageFormData, title: e.target.value })}
                  placeholder="e.g., Lions in Serengeti"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                <textarea
                  value={imageFormData.caption}
                  onChange={(e) => setImageFormData({ ...imageFormData, caption: e.target.value })}
                  placeholder="Brief description of the image"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={imageFormData.category}
                  onChange={(e) => setImageFormData({ ...imageFormData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                >
                  <option value="">Select category</option>
                  <option value="Wildlife">Wildlife</option>
                  <option value="Mountains">Mountains</option>
                  <option value="Beaches">Beaches</option>
                  <option value="Culture">Culture</option>
                  <option value="Landscapes">Landscapes</option>
                </select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <input
                  type="checkbox"
                  id="image-active"
                  checked={imageFormData.active}
                  onChange={(e) => setImageFormData({ ...imageFormData, active: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="image-active" className="ml-3 text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setShowAddImageModal(false)}
                disabled={loading || imageUploading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-white transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                disabled={loading || imageUploading || !imageFormData.url}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
              >
                {loading ? 'Adding...' : imageUploading ? 'Uploading...' : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Add Video</h2>
                <button
                  onClick={() => setShowAddVideoModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Upload Mode Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex gap-4">
                  <button
                    onClick={() => setVideoUploadMode('upload')}
                    className={`pb-3 px-1 border-b-2 font-medium transition ${
                      videoUploadMode === 'upload'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📁 Upload Video File
                  </button>
                  <button
                    onClick={() => setVideoUploadMode('url')}
                    className={`pb-3 px-1 border-b-2 font-medium transition ${
                      videoUploadMode === 'url'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🎬 YouTube URL
                  </button>
                </nav>
              </div>

              {/* Upload Video File */}
              {videoUploadMode === 'upload' && (
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 hover:border-primary transition">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                    onChange={handleVideoFileUpload}
                    disabled={videoUploading}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer flex flex-col items-center justify-center py-8"
                  >
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {videoUploading ? (
                      <p className="text-primary font-semibold">Uploading... This may take a while for large videos</p>
                    ) : videoFormData.url ? (
                      <div className="text-center">
                        <p className="text-green-600 font-semibold mb-2">✓ Video uploaded successfully!</p>
                        <p className="text-sm text-gray-500">Click to upload a different video</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-gray-700 font-semibold mb-2">Click to upload video</p>
                        <p className="text-sm text-gray-500">Supports: MP4, WebM, MOV, AVI (Max 100MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              )}

              {/* YouTube URL Input */}
              {videoUploadMode === 'url' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={videoFormData.url}
                    onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  />
                  <p className="text-sm text-gray-500 mt-2">Paste the full YouTube video URL</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="e.g., Serengeti Safari Adventure"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  placeholder="Brief description of the video"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={videoFormData.category}
                  onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                >
                  <option value="">Select category</option>
                  <option value="Safari">Safari</option>
                  <option value="Mountain Trekking">Mountain Trekking</option>
                  <option value="Beach">Beach</option>
                  <option value="Culture">Culture</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <input
                  type="checkbox"
                  id="video-active"
                  checked={videoFormData.active}
                  onChange={(e) => setVideoFormData({ ...videoFormData, active: e.target.checked })}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="video-active" className="ml-3 text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setShowAddVideoModal(false)}
                disabled={loading || videoUploading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-white transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={addVideo}
                disabled={loading || videoUploading || !videoFormData.url || !videoFormData.title}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
              >
                {loading ? 'Adding...' : videoUploading ? 'Uploading...' : 'Add Video'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
