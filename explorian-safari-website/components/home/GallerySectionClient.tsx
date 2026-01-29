'use client';

import { useEffect, useState } from 'react';
import GalleryLightbox from '../GalleryLightbox';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export default function GallerySectionClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      }
    }
    fetchImages();
  }, []);

  return <GalleryLightbox images={images} />;
}
