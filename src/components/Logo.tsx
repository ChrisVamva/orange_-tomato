export const Logo = ({ className = "h-8 aspect-[1287/1222]" }: { className?: string }) => {
  return (
    <span className={`inline-block aspect-[1287/1222] shrink-0 ${className}`}>
      <img
        src="/Logo/retro-sci-fi-tomato-thinkers.webp"
        alt="Orange Tomato logo: a person with braided hair and glasses facing a small tomato-headed robot across a laptop"
        className="h-full w-full"
        width={256}
        height={243}
      />
    </span>
  );
};
