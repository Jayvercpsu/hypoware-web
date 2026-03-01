"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface IconWithFallbackProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
}

export function IconWithFallback({
  src,
  alt,
  label,
  className,
  imgClassName,
}: IconWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  const initials = useMemo(() => {
    const source = label || alt;
    return source
      .split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [alt, label]);

  if (failed || !src) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-sky-200 text-xs font-bold text-sky-900",
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(className, imgClassName)}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
