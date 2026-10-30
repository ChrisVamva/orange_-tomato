import { useRef, type PointerEvent } from 'react';

const IRIS_CENTER = { x: 0.7262, y: 0.4244 };
const MAX_IRIS_OFFSET = 0.015;

export const Logo = ({ className = "h-8 aspect-[599/827]" }: { className?: string }) => {
  const irisRef = useRef<HTMLImageElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width * IRIS_CENTER.x);
    const dy = event.clientY - (bounds.top + bounds.height * IRIS_CENTER.y);
    const distance = Math.hypot(dx, dy);
    const maxOffset = bounds.height * MAX_IRIS_OFFSET;
    const scale = distance > maxOffset ? maxOffset / distance : 1;

    irisRef.current?.style.setProperty('--iris-x', `${dx * scale}px`);
    irisRef.current?.style.setProperty('--iris-y', `${dy * scale}px`);
  };

  const resetIris = () => {
    irisRef.current?.style.setProperty('--iris-x', '0px');
    irisRef.current?.style.setProperty('--iris-y', '0px');
  };

  return (
    <span
      className={`relative inline-block aspect-[599/827] shrink-0 ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetIris}
    >
      <img
        src="/Logo/orange-tomato-mascot.png"
        alt="Orange Tomato robot mascot"
        className="absolute inset-0 h-full w-full"
      />
      <img
        ref={irisRef}
        src="/Logo/orange-tomato-iris.png"
        alt=""
        aria-hidden="true"
        className="mascot-iris absolute left-[72.62%] top-[42.44%] w-[14.19%] max-w-none"
        style={{
          transform: 'translate(calc(-50% + var(--iris-x, 0px)), calc(-50% + var(--iris-y, 0px)))',
        }}
      />
    </span>
  );
};
