
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure any errors during application startup are caught and logged
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");
  
  const root = createRoot(rootElement);
  
  root.render(<App />);
  
  console.log("Application started successfully");
} catch (error) {
  console.error("Failed to initialize application:", error);
  // You could render a fallback UI here if needed
}
