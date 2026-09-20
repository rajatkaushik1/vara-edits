import React from 'react';
import { motion } from 'framer-motion';

const LOGOS = [
  { id: 1, name: 'VARA', src: '/logos/logo-1.png' },
  { id: 2, name: 'Partner 2', src: '/logos/logo-2.png' },
  { id: 3, name: 'Partner 3', src: '/logos/logo-3.png' },
  { id: 4, name: 'Simple It', src: '/logos/logo-4.png' },
  { id: 5, name: 'PC Creator', src: '/logos/logo-5.png' },
  { id: 6, name: 'VARA Edits', src: '/logos/logo-6.png', screenBlend: true },
  { id: 7, name: 'VARA Automation', src: '/logos/logo-7.png', screenBlend: true },
  { id: 8, name: 'VARA Media', src: '/logos/logo-8.png', screenBlend: true },
];

export default function LogoCarousel() {
  // Duplicate array 3 times to ensure a seamless, uninterrupted infinite marquee loop
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <motion.section
      className="logo-carousel-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header text container */}
      <div className="carousel-header">
        <h2>
          We Didn't Start <span>Yesterday.</span>
        </h2>
        <p className="carousel-subtext">
          We are not new in business. We operate multiple services across many industries.
        </p>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="marquee-container interactive">
        {/* Left & Right gradient shadow overlays for smooth edge fading */}
        <div className="marquee-fade-overlay left" />
        <div className="marquee-fade-overlay right" />

        <div className="marquee-track">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="logo-card interactive"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`logo-img ${logo.screenBlend ? 'screen-blend' : ''}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
