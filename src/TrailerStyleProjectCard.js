import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const expandTimeoutRef = useRef(null);

  // Check if project has video
  const hasVideo = project.demoVideo && project.demoVideo.length > 0;

  // Handle mouse enter on card
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    clearTimeout(expandTimeoutRef.current);

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
    clearTimeout(timeoutRef.current);

    // Collapse immediately when mouse leaves
    if (!isDetailView) {
      setIsExpanded(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
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
  
  // Handle ESC key to close detailed view
  useEffect(() => {
    const handleEscKey = (e) => {
      if (isDetailView && e.key === 'Escape') {
        setIsDetailView(false);
        document.body.style.overflow = '';
      }
    };

    if (isDetailView) {
      document.addEventListener('keydown', handleEscKey);
    }

    // Capture current timeout values for cleanup
    const currentTimeout = timeoutRef.current;
    const currentExpandTimeout = expandTimeoutRef.current;

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      clearTimeout(currentTimeout);
      clearTimeout(currentExpandTimeout);
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

      {/* Enhanced detail modal - Full screen preview with comprehensive information */}
      {isDetailView && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 overflow-y-auto">
          {/* Fixed Header with close button */}
          <div className="sticky top-0 z-[10000] bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-lg">
            <div className="w-full px-6 md:px-12 py-5 flex justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">{project.period}</span>
              </div>
              <button
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
                onClick={toggleDetailView}
                aria-label="Close detail view"
              >
                <X size={32} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="w-full px-6 md:px-12 lg:px-20 py-10 max-w-7xl mx-auto"
          >

            {/* Description */}
            <div className="mb-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Overview</h3>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-5 py-3 text-lg font-medium bg-secondary dark:bg-tertiary text-primary dark:text-gray-800 rounded-lg shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Information - Only show if available */}
            {project.detailedInfo && (
              <div className="space-y-12">
                {/* Objective */}
                {project.detailedInfo.objective && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border-l-4 border-blue-500">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Objective</h3>
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{project.detailedInfo.objective}</p>
                  </div>
                )}

                {/* Dataset Information */}
                {project.detailedInfo.dataset && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Dataset</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl space-y-6">
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{project.detailedInfo.dataset.description}</p>

                      {project.detailedInfo.dataset.features && (
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Features</h4>
                          <div className="flex flex-wrap gap-3">
                            {project.detailedInfo.dataset.features.map((feature, i) => (
                              <span key={i} className="px-4 py-2 text-base bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.detailedInfo.dataset.preprocessing && (
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Preprocessing Steps</h4>
                          <ul className="space-y-3">
                            {project.detailedInfo.dataset.preprocessing.map((step, i) => (
                              <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                                <span className="text-primary dark:text-tertiary mr-3 mt-1 text-xl">•</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Methodology */}
                {project.detailedInfo.methodology && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Methodology</h3>
                    <div className="grid gap-6">
                      {project.detailedInfo.methodology.map((method, i) => (
                        <div key={i} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
                          <h4 className="text-2xl font-bold text-primary dark:text-tertiary mb-5">{method.algorithm}</h4>
                          <div className="space-y-4 text-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold text-gray-900 dark:text-white">Approach:</span> {method.approach}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold text-gray-900 dark:text-white">Optimization:</span> {method.optimization}
                            </p>
                            {(method.initialAccuracy || method.finalAccuracy) && (
                              <div className="flex flex-wrap gap-6 pt-3">
                                {method.initialAccuracy && (
                                  <div className="bg-red-100 dark:bg-red-900/30 px-6 py-3 rounded-lg">
                                    <span className="text-base text-gray-600 dark:text-gray-400">Initial Accuracy</span>
                                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{method.initialAccuracy}</p>
                                  </div>
                                )}
                                {method.finalAccuracy && (
                                  <div className="bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-lg">
                                    <span className="text-base text-gray-600 dark:text-gray-400">Final Accuracy</span>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{method.finalAccuracy}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Findings */}
                {project.detailedInfo.keyFindings && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Key Findings</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-xl border-l-4 border-yellow-500">
                      <ul className="space-y-4">
                        {project.detailedInfo.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                            <span className="text-yellow-600 dark:text-yellow-400 mr-4 mt-1 text-2xl">★</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Results */}
                {project.detailedInfo.results && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Results</h3>
                    <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border-l-4 border-green-500 space-y-6">
                      {project.detailedInfo.results.bestModels && (
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Performing Models</h4>
                          <div className="flex flex-wrap gap-3">
                            {project.detailedInfo.results.bestModels.map((model, i) => (
                              <span key={i} className="px-5 py-3 text-lg bg-green-600 dark:bg-green-700 text-white rounded-lg font-semibold shadow-md">
                                {model}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.detailedInfo.results.metrics && (
                        <ul className="space-y-3">
                          {project.detailedInfo.results.metrics.map((metric, i) => (
                            <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                              <span className="text-green-600 dark:text-green-400 mr-3 mt-1 text-xl">✓</span>
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {project.detailedInfo.challenges && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Challenges</h3>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-xl border-l-4 border-orange-500">
                      <ul className="space-y-4">
                        {project.detailedInfo.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                            <span className="text-orange-600 dark:text-orange-400 mr-4 mt-1 text-xl">⚠</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Insights */}
                {project.detailedInfo.insights && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Insights</h3>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-xl border-l-4 border-purple-500">
                      <ul className="space-y-4">
                        {project.detailedInfo.insights.map((insight, i) => (
                          <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                            <span className="text-purple-600 dark:text-purple-400 mr-4 mt-1 text-xl">💡</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Future Work */}
                {project.detailedInfo.futureWork && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Future Work</h3>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-xl border-l-4 border-indigo-500">
                      <ul className="space-y-4">
                        {project.detailedInfo.futureWork.map((work, i) => (
                          <li key={i} className="flex items-start text-lg text-gray-700 dark:text-gray-300">
                            <span className="text-indigo-600 dark:text-indigo-400 mr-4 mt-1 text-xl">→</span>
                            <span>{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Links */}
            <div className="mt-12 pt-8 border-t dark:border-gray-700">
              <div className="flex flex-wrap gap-4 justify-center">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all text-lg font-medium shadow-lg hover:shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={24} />
                    <span>View on GitHub</span>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all text-lg font-medium shadow-lg hover:shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe size={24} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bottom padding for scroll */}
            <div className="h-8"></div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export default TrailerStyleProjectCard;

// TrailerStyleProjectCard