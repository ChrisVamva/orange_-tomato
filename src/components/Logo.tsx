export const Logo = ({ className = "h-8 aspect-[3/2]" }: { className?: string }) => {
  return (
    <span className={`inline-block aspect-[3/2] shrink-0 ${className}`}>
      <img
        src="/Logo/New%20Logo.png"
        alt="Huntress and Orange Tomato robot mascot logo"
        className="h-full w-full"
      />
    </span>
  );
};
