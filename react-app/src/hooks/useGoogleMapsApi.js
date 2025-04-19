import { useEffect, useState } from 'react';

// Singleton to track if the API is already loaded
let isLoaded = false;
let isLoading = false;
let loadError = null;
let callbacks = [];

/**
 * Custom hook to load Google Maps API once across the application
 * @param {Object} options - Options for loading the API
 * @param {string} options.apiKey - Google Maps API key
 * @param {Array} options.libraries - Libraries to load with the API
 * @returns {Object} Object containing loaded status and any error
 */
const useGoogleMapsApi = (options = {}) => {
  const [loaded, setLoaded] = useState(isLoaded);
  const [error, setError] = useState(loadError);
  
  const apiKey = options.apiKey || 'AIzaSyBNLrJhOMz6idD05pzwk_qCXOXsYW9Lrg4';
  // Include all necessary libraries by default: places, drawing, geometry, visualization
  const libraries = options.libraries || ['places', 'drawing', 'geometry', 'visualization'];
  
  useEffect(() => {
    // If already loaded, return immediately
    if (isLoaded) {
      setLoaded(true);
      return;
    }
    
    // If there was an error, set it
    if (loadError) {
      setError(loadError);
      return;
    }
    
    // Add callback to the queue if API is currently loading
    if (isLoading) {
      callbacks.push(() => {
        setLoaded(true);
        if (loadError) setError(loadError);
      });
      return;
    }
    
    // Start loading the API
    isLoading = true;
    
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      isLoaded = true;
      isLoading = false;
      setLoaded(true);
      
      // Execute all callbacks
      callbacks.forEach(callback => callback());
      callbacks = [];
      
      return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
    script.async = true;
    script.defer = true;
    
    // Handle script load
    script.onload = () => {
      // Verify that the API loaded correctly
      if (window.google && window.google.maps) {
        console.log('Google Maps API loaded successfully with libraries:', libraries.join(','));
        isLoaded = true;
        loadError = null;
      } else {
        console.error('Google Maps API script loaded but API not available');
        loadError = new Error('Google Maps API loaded but not available');
        setError(loadError);
      }
      
      isLoading = false;
      setLoaded(isLoaded);
      
      // Execute all callbacks
      callbacks.forEach(callback => callback());
      callbacks = [];
    };
    
    // Handle script error
    script.onerror = (event) => {
      console.error('Error loading Google Maps API:', event);
      isLoading = false;
      loadError = new Error('Failed to load Google Maps API');
      setError(loadError);
      
      // Clear callbacks on error
      callbacks = [];
    };
    
    // Add script to document
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      // Only remove callbacks for this component
      callbacks = callbacks.filter(callback => callback !== setLoaded);
    };
  }, [apiKey, libraries.join(',')]);
  
  return { loaded, error };
};

export default useGoogleMapsApi;
