import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId);
    console.log('Google Analytics initialized');
  } else {
    console.warn('Google Analytics Measurement ID not found');
  }
};

// Track page views
export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

// Track custom events
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  logEvent('Button', 'Click', buttonName);
};

// Track project card clicks
export const trackProjectClick = (projectName) => {
  logEvent('Project', 'View', projectName);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  logEvent('Social Media', 'Click', platform);
};
