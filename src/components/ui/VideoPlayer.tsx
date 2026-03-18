'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Lazy load: only set src when the video enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.src = src;
            video.load();
            video.play().catch(() => {});
            observer.unobserve(video);
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-brand-navy',
        className
      )}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="h-full w-full object-cover"
      >
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
