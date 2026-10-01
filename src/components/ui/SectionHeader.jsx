import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = ""
}) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3 justify-center">
          <span className="h-px w-6 bg-[#B89758]"></span>
          <span className="editorial-subheading tracking-[0.25em] text-[#B89758] text-xs font-semibold uppercase">
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-[#B89758]"></span>
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.18] tracking-tight ${
          light ? "text-[#FDFBF7]" : "text-[#161514]"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg font-light leading-relaxed ${
            light ? "text-[#D8CEBE]" : "text-[#634832]/85"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
