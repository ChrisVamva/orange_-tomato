export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* The Main Tomato Body */}
    <circle cx="50" cy="50" r="45" fill="#FF6347" />
    
    {/* The Modern "Data Slice" (45-degree cut) */}
    <path 
      d="M20 20L80 80" 
      stroke="white" 
      strokeWidth="12" 
      strokeLinecap="square"
    />
  </svg>
);
