"use client";

import { useEffect, useId, useRef, useState } from "react";

interface GlassPanelProps {
  mode?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
  /** Border radius in px — should match the rounded-* class on className */
  borderRadius?: number;
  /** Shadow applied to the outer wrapper — defaults to the standard glass shadow */
  shadow?: string;
  /** When false, the glass layers fade out (opacity) instead of unmounting, so the panel can morph smoothly */
  active?: boolean;
}

/**
 * Apple-style "liquid glass" panel using a per-instance SVG displacement filter.
 * The filter warps + chromatically aberrates the backdrop based on the panel's
 * actual measured size and border radius, so edges refract like glass.
 */
export default function GlassPanel({
  mode = "light",
  className = "",
  borderRadius = 20,
  shadow,
  active = true,
  children,
}: GlassPanelProps) {
  const rawId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height } = size;
  const borderWidth = Math.max(1, Math.min(width, height) * 0.035);

  const mapSvg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red-grad-${rawId}" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue-grad-${rawId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#red-grad-${rawId})" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#blue-grad-${rawId})" style="mix-blend-mode:screen" />
      <rect x="${borderWidth}" y="${borderWidth}" width="${width - 2 * borderWidth}" height="${height - 2 * borderWidth}" rx="${borderRadius}" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(7px)" />
    </svg>
  `;
  const mapDataUri = `data:image/svg+xml,${encodeURIComponent(mapSvg)}`;

  const defaultShadow =
    mode === "dark"
      ? "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
      : "shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]";

  const ready = width > 0 && height > 0;

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 ease-out ${
        active ? (shadow ?? defaultShadow) : "shadow-none"
      } ${className}`}
    >
      {ready && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0"
        >
          <defs>
            <filter
              id={`glass-filter-${rawId}`}
              colorInterpolationFilters="sRGB"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
                href={mapDataUri}
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                result="dispRed"
                scale="-70"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                result="dispGreen"
                scale="-65"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="green"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                result="dispBlue"
                scale="-60"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"
              />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation="0.5" />
            </filter>
          </defs>
        </svg>
      )}

      {/* overflow-hidden scoped to glass layers only so children (dropdowns) can escape */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] transition-opacity duration-500 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Layer 1: distortion warp */}
        <div
          aria-hidden
          style={ready ? { filter: `url(#glass-filter-${rawId})` } : undefined}
          className="absolute inset-0 rounded-[inherit] backdrop-blur-sm"
        />
        {/* Layer 2: tint */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[inherit] backdrop-saturate-[180%] ${
            mode === "dark" ? "bg-gray-900/50" : "bg-white/35"
          }`}
        />
        {/* Layer 3: specular border */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[inherit] border ring-1 ring-inset ${
            mode === "dark"
              ? "border-white/10 ring-white/10"
              : "border-white/40 ring-white/40"
          }`}
        />
      </div>
      <div className="contents">{children}</div>
    </div>
  );
}
