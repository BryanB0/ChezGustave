//Import
import { useLayoutEffect, useState } from "react";

// Definition of the custom hook
export default function useWindowSize() {
    // Declaration of state to store window width and height
    const [size, setSize] = useState([0, 0]);

    // Ensure size update is synchronous with the DOM
    useLayoutEffect(() => {
      // Function to update size 
      function updateSize() {
        // Update size with inner width and height of the browser window
        setSize([window.innerWidth, window.innerHeight]);
      }
      // Add listener for window resize
      window.addEventListener('resize', updateSize);
      // Initial call to update size
      updateSize();
      // Cleanup: remove event listener
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    // Return current window size
    return size;
}