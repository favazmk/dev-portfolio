import type { ReactNode } from "react";

/**
 * The ruled sheet the whole site sits on. The body behind it is a cutting-mat
 * grid, so the sheet reads as a physical page laid on a desk.
 */
export default function Paper({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-0 sm:px-6 lg:px-10">
      <div className="sheet relative overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_18px_50px_-20px_rgba(0,0,0,0.45)]">
        {children}
      </div>
    </div>
  );
}
