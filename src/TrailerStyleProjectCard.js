import React, { useState, useRef, useEffect } from 'react';
import { Github, Globe, Play, Info, X, Volume2, VolumeX } from 'lucide-react';

const TrailerStyleProjectCard = ({ project }) => {
  // State for card expansion and video
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDetailView, setIsDetailView] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Refs
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const expandTimeoutRef = useRef(null);
  
  // Check if project has video
  const hasVideo = project.demoVideo && project.demoVideo.length > 0;
  
  // Handle mouse enter on card
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    
    expandTimeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
      
      // Autoplay video after expansion
      if (hasVideo) {
        setTimeout(() => {
          playVideo();
        }, 300);
      }
    }, 500);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    clearTimeout(expandTimeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      if (!isDetailView) {
        setIsExpanded(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setIsPlaying(false);
        }
      }
    }, 300);
  };
  
  // Toggle detail view
  const toggleDetailView = (e) => {
    e.stopPropagation();
    setIsDetailView(!isDetailView);
    if (!isDetailView) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when detail view is open
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  };
  
  // Handle clicks outside the detailed view
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDetailView && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsDetailView(false);
        document.body.style.overflow = '';
      }
    };
    
    const handleEscKey = (e) => {
      if (isDetailView && e.key === 'Escape') {
        setIsDetailView(false);
        document.body.style.overflow = '';
      }
    };
    
    if (isDetailView) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      clearTimeout(timeoutRef.current);
      clearTimeout(expandTimeoutRef.current);
    };
  }, [isDetailView]);
  
  // Play video with error handling
  const playVideo = () => {
    if (!videoRef.current) return;
    
    const playPromise = videoRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          // Try playing muted if failed (browser autoplay policies)
          if (!isMuted) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(e => {
                setVideoError(true);
              });
          } else {
            setVideoError(true);
          }
        });
    }
  };
  
  // Toggle play/pause
  const togglePlayPause = (e) => {
    e.stopPropagation();
    
    if (videoError) {
      setVideoError(false); // Reset error state for retry
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        playVideo();
      }
    }
  };
  
  // Toggle mute/unmute
  const toggleMute = (e) => {
    e.stopPropagation();
    
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Calculate card scale and z-index based on expansion state
  const cardStyle = {
    zIndex: isExpanded ? 40 : 10,
    transform: isExpanded ? 'scale(1.2)' : 'scale(1)',
  };
  
  return (
    <div className="relative group p-4" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* The project card - Netflix style with expansion */}
      <div 
        ref={cardRef}
        className="rounded-md overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 transform origin-center"
        style={cardStyle}
      >
        {/* Card content */}
        <div className={`w-full transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-100'}`}>
          {/* Image or Video based on expansion state */}
          <div className="relative aspect-video overflow-hidden bg-gray-900">
            {isExpanded && hasVideo ? (
              <div className="w-full h-full">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={project.demoVideo}
                  muted={isMuted}
                  loop={project.loop !== false}
                  playsInline
                  onError={() => setVideoError(true)}
                />
                
                {/* Video controls - Netflix style */}
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <button 
                    className="bg-black/60 p-2 rounded-full hover:bg-black/80 transition-all"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX size={16} className="text-white" />
                    ) : (
                      <Volume2 size={16} className="text-white" />
                    )}
                  </button>
                </div>
                
                {/* Error state */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <button 
                      className="flex flex-col items-center"
                      onClick={togglePlayPause}
                    >
                      <Play size={32} className="text-white" />
                      <span className="text-white text-sm mt-2">Retry</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            )}
            
            {/* Title overlay on non-expanded state */}
            {!isExpanded && (
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tags && project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 text-xs font-medium bg-primary/70 text-white rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Info button for detailed view - Netflix style */}
            {isExpanded && (
              <button
                className="absolute bottom-2 left-2 bg-white p-2 rounded-full text-black hover:bg-opacity-90 transition-all"
                onClick={toggleDetailView}
                aria-label="More information"
              >
                <Info size={16} />
              </button>
            )}
          </div>
          
          {/* Expanded card info - Similar to Netflix dropdown */}
          {isExpanded && (
            <div className="bg-white dark:bg-gray-800 p-4 max-h-80 overflow-y-auto">
              {/* Title and period */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{project.period}</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags && project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs font-medium bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Full description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {project.description}
              </p>
              
              {/* Tech stack preview */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between">
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all flex items-center gap-2"
                  onClick={toggleDetailView}
                >
                  <Info size={16} />
                  <span>More Info</span>
                </button>
                
                <div className="flex gap-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="text-gray-700 dark:text-gray-300" />
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Globe size={16} className="text-gray-700 dark:text-gray-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Simplified detail modal - Only shows description and tech */}
      {isDetailView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl animate-fadeIn"
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
              <button 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                onClick={toggleDetailView}
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h4>
              <p className="text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
            </div>
            
            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrailerStyleProjectCard;

// TrailerStyleProjectCard