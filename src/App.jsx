import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { getCalApi } from "@calcom/embed-react";
import CustomCursor from './CustomCursor';
import { ArrowRight } from 'lucide-react';
import WorkflowAnimation from './WorkflowAnimation';
import CostComparisonChart from './CostComparisonChart';
import SpeedComparisonChart from './SpeedComparisonChart';
import QualityFormulaVisual from './QualityFormulaVisual';
import VaraMusicVisual from './VaraMusicVisual';
import LogoCarousel from './LogoCarousel';
import './index.css';

// 4-point diamond sparkle SVG
function SparkleStar({ size = 10, color = "#fde482" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'block' }}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// Staggered glitter particles behind the logo
const LEFT_DRIFT_PARTICLES = [
  { id: 1, x: -14, y: -8, size: 10, delay: 0, duration: 1.1 },
  { id: 2, x: -28, y: 6, size: 7, delay: 0.18, duration: 0.95 },
  { id: 3, x: -44, y: -4, size: 12, delay: 0.35, duration: 1.3 },
  { id: 4, x: -60, y: 8, size: 6, delay: 0.1, duration: 0.85 },
  { id: 5, x: -22, y: 12, size: 8, delay: 0.28, duration: 1.05 },
  { id: 6, x: -38, y: -12, size: 9, delay: 0.45, duration: 1.2 },
  { id: 7, x: -52, y: 2, size: 5, delay: 0.2, duration: 0.8 },
];

const RIGHT_DRIFT_PARTICLES = [
  { id: 1, x: 14, y: -8, size: 10, delay: 0, duration: 1.1 },
  { id: 2, x: 28, y: 6, size: 7, delay: 0.18, duration: 0.95 },
  { id: 3, x: 44, y: -4, size: 12, delay: 0.35, duration: 1.3 },
  { id: 4, x: 60, y: 8, size: 6, delay: 0.1, duration: 0.85 },
  { id: 5, x: 22, y: 12, size: 8, delay: 0.28, duration: 1.05 },
  { id: 6, x: 38, y: -12, size: 9, delay: 0.45, duration: 1.2 },
  { id: 7, x: 52, y: 2, size: 5, delay: 0.2, duration: 0.8 },
];

function App() {
  const headerLeftRef = useRef(null);
  const logoRef = useRef(null);
  const [maxDistance, setMaxDistance] = useState(0);

  // Track global page scroll progress (0 at top, 1 at bottom)
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.2,
  });

  // Calculate scroll velocity for authentic dynamic drift physics
  const scrollVelocity = useVelocity(smoothProgress);

  // Dynamic drift tilt angle (-3.5deg to +3.5deg) based on movement direction
  const logoRotate = useTransform(scrollVelocity, [-1.5, 0, 1.5], [-3.5, 0, 3.5], { clamp: true });

  // Calculate horizontal position across header width
  const logoX = useTransform(smoothProgress, (val) => val * maxDistance);

  // Dynamic opacity for the left/right drift trails based on movement direction
  // When scrolling down (velocity > 0), the logo moves right, so trail flares on the LEFT
  const leftTrailOpacity = useTransform(scrollVelocity, [-0.02, 0, 0.05, 0.35], [0.15, 0.25, 0.85, 1], { clamp: true });
  // When scrolling up (velocity < 0), the logo moves left, so trail flares on the RIGHT
  const rightTrailOpacity = useTransform(scrollVelocity, [-0.35, -0.05, 0, 0.02], [1, 0.85, 0.25, 0.15], { clamp: true });

  const updateDistance = () => {
    if (headerLeftRef.current && logoRef.current) {
      const containerWidth = headerLeftRef.current.offsetWidth;
      const logoWidth = logoRef.current.offsetWidth;
      setMaxDistance(Math.max(0, containerWidth - logoWidth));
    }
  };

  const scrollToBooking = () => {
    const cta = document.querySelector('.try-audio-button');
    if (cta) {
      cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    updateDistance();

    (async function () {
      const cal = await getCalApi({});
      cal("ui", {"styles":{"branding":{"brandColor":"#ebba2f"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();

    const observer = new ResizeObserver(() => {
      updateDistance();
    });

    if (headerLeftRef.current) {
      observer.observe(headerLeftRef.current);
    }

    window.addEventListener('resize', updateDistance);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Header with Logo & Book Button */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          ref={headerLeftRef}
          className="header-left"
          style={{ flex: 1, position: 'relative', marginRight: '20px', minHeight: '40px', display: 'flex', alignItems: 'center' }}
        >
          <motion.div
            ref={logoRef}
            className="logo interactive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              x: logoX,
              rotate: logoRotate,
              willChange: 'transform',
              position: 'relative',
            }}
          >
            {/* Left Drift Trail (behind logo when sliding right) */}
            <motion.div
              style={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                opacity: leftTrailOpacity,
                zIndex: 0,
              }}
            >
              {/* Soft gold drift haze */}
              <div
                style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '-18px',
                  width: '90px',
                  height: '36px',
                  background: 'radial-gradient(ellipse at right center, rgba(235, 186, 47, 0.5) 0%, rgba(245, 197, 66, 0.25) 45%, transparent 75%)',
                  filter: 'blur(5px)',
                }}
              />
              {/* Twinkling Glitter Particles */}
              {LEFT_DRIFT_PARTICLES.map((p) => (
                <motion.div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    right: `${-p.x}px`,
                    top: `${p.y}px`,
                    filter: 'drop-shadow(0 0 6px rgba(245, 197, 66, 0.95)) drop-shadow(0 0 10px rgba(235, 186, 47, 0.6))',
                  }}
                  animate={{
                    scale: [0.3, 1.2, 0.3],
                    opacity: [0.2, 1, 0.2],
                    rotate: [0, 90, 180],
                    x: [0, -14, -24],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }}
                >
                  <SparkleStar size={p.size} color="#fde482" />
                </motion.div>
              ))}
            </motion.div>

            {/* Right Drift Trail (behind logo when sliding left) */}
            <motion.div
              style={{
                position: 'absolute',
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                opacity: rightTrailOpacity,
                zIndex: 0,
              }}
            >
              {/* Soft gold drift haze */}
              <div
                style={{
                  position: 'absolute',
                  left: '-10px',
                  top: '-18px',
                  width: '90px',
                  height: '36px',
                  background: 'radial-gradient(ellipse at left center, rgba(235, 186, 47, 0.5) 0%, rgba(245, 197, 66, 0.25) 45%, transparent 75%)',
                  filter: 'blur(5px)',
                }}
              />
              {/* Twinkling Glitter Particles */}
              {RIGHT_DRIFT_PARTICLES.map((p) => (
                <motion.div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: `${p.x}px`,
                    top: `${p.y}px`,
                    filter: 'drop-shadow(0 0 6px rgba(245, 197, 66, 0.95)) drop-shadow(0 0 10px rgba(235, 186, 47, 0.6))',
                  }}
                  animate={{
                    scale: [0.3, 1.2, 0.3],
                    opacity: [0.2, 1, 0.2],
                    rotate: [0, -90, -180],
                    x: [0, 14, 24],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }}
                >
                  <SparkleStar size={p.size} color="#fde482" />
                </motion.div>
              ))}
            </motion.div>

            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="Vara Edits Logo"
              onLoad={updateDistance}
              style={{ height: '40px', width: 'auto', position: 'relative', zIndex: 1 }}
            />
          </motion.div>
        </div>

        {/* Header Book Button */}
        <motion.button
          data-cal-link="rajat-kaushik-5w5v0g/vara-edits-discovery-call" data-cal-config='{"layout":"month_view"}'
          className="header-book-button interactive"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>Book</span>
          <ArrowRight size={14} className="header-btn-arrow" />
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content-wrapper">

          {/* 1. First: Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Livestreams are <br />
            <span>Highly Underrated.</span>
          </motion.h1>

          {/* 2. Next: Text below it */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            We are begging you to stop letting hours of great content go to waste. Feed us your raw stream, and we will instantly extract your best moments and deliver viral, platform-ready reels and videos <strong style={{ color: '#ebba2f' }}>under 6 hours</strong>.
          </motion.p>

          {/* 3. And so on: Workflow Animation */}
          <motion.div
            style={{ width: '100%' }}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorkflowAnimation />
          </motion.div>

          {/* 4. Affordable Section */}
          <motion.div
            className="feature-block affordable-section interactive"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '80px', marginBottom: '60px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'left' }}
          >
            <motion.div
              className="feature-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 style={{ textAlign: 'left' }}>
                Why We Are the <br />
                <span>Most Affordable.</span>
              </h2>
              <p className="hero-description" style={{ marginLeft: 0, marginTop: '20px', fontSize: '1.05rem', color: '#b0b0b0' }}>
                Traditional video editing agencies are 100% dependent on manual human labor—manually scrubbing through footage, cutting dead air, and grading color. By utilizing our proprietary <strong style={{ color: '#ebba2f' }}>VARA-AI engine</strong>, we drastically eliminate the need for the massive, expensive effort of traditional human editors. Our AI workflow is designed for <strong style={{ color: '#ebba2f' }}>minimum cost with zero compromise on quality</strong>, which means we pass those massive operational savings directly down to you, offering premium edits at a <strong style={{ color: '#ebba2f' }}>fraction of the market cost</strong>.
              </p>
            </motion.div>
            <motion.div
              className="feature-visual"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 400px' }}
            >
              <CostComparisonChart />
            </motion.div>
          </motion.div>

          {/* 5. Fastest Section */}
          <motion.div
            className="feature-block fastest-section interactive"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '60px', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'left' }}
          >
            <motion.div
              className="feature-visual"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 400px' }}
            >
              <SpeedComparisonChart />
            </motion.div>
            <motion.div
              className="feature-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 style={{ textAlign: 'left' }}>
                Why We Are the <br />
                <span>Fastest.</span>
              </h2>
              <p className="hero-description" style={{ marginLeft: 0, marginTop: '20px', fontSize: '1.05rem', color: '#b0b0b0' }}>
                It takes a human editor hours just to watch a livestream. <strong style={{ color: '#ebba2f' }}>VARA-AI</strong> processes your entire broadcast in parallel in a matter of minutes. It instantly scans your footage for high-retention moments and viral hooks. What takes a traditional agency a week, we deliver to your inbox in <strong style={{ color: '#ebba2f' }}>under 6 hours</strong>.
              </p>
            </motion.div>
          </motion.div>

          {/* 6. Quality Section */}
          <motion.div
            className="feature-block quality-section interactive"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '80px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'left' }}
          >
            <motion.div
              className="feature-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 style={{ textAlign: 'left' }}>
                Why We Have the <br />
                <span>Best Quality.</span>
              </h2>
              <p className="hero-description" style={{ marginLeft: 0, marginTop: '20px', fontSize: '1.05rem', color: '#b0b0b0' }}>
                Viral content isn't luck; it's a formula. The biggest channels on YouTube and Instagram rely on proven psychological hooks, pacing structures, and retention metrics. Instead of guessing, we apply a strict <strong style={{ color: '#ebba2f' }}>formula-based approach</strong> to your content. <strong style={{ color: '#ebba2f' }}>VARA-AI</strong> engineers every cut, caption, and sound effect to maximize audience retention and guarantee algorithmic success.
              </p>
            </motion.div>
            <motion.div
              className="feature-visual"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 400px' }}
            >
              <QualityFormulaVisual />
            </motion.div>
          </motion.div>

          {/* 7. VaraMusic Section */}
          <motion.div
            className="feature-block music-section interactive"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '80px', display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'left' }}
          >
            <motion.div
              className="feature-visual"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 400px' }}
            >
              <VaraMusicVisual />
            </motion.div>
            <motion.div
              className="feature-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '1 1 500px' }}
            >
              <h2 style={{ textAlign: 'left' }}>
                We know our shit <span className="glow-well">well.</span>
              </h2>
              <p className="hero-description" style={{ marginLeft: 0, marginTop: '20px', fontSize: '1.05rem', color: '#b0b0b0' }}>
                We know very well that stale, repetitive background tracks kill viewer retention immediately. That's why we use <a href="https://varamusic.com" target="_blank" rel="noopener noreferrer" className="music-link interactive">varamusic.com</a>. <strong style={{ color: '#ebba2f' }}>VARA</strong> has thousands of <strong style={{ color: '#ebba2f' }}>100% copyright-free</strong> tracks that keep viewers glued to the screen.
              </p>
            </motion.div>
          </motion.div>

          {/* Social Proof Logo Carousel */}
          <LogoCarousel />

          {/* 8. Call To Action Button */}
          <motion.button
            data-cal-link="rajat-kaushik-5w5v0g/vara-edits-discovery-call" data-cal-config='{"layout":"month_view"}'
            className="try-audio-button interactive"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book a Free Meeting</span>
            <ArrowRight size={18} className="cta-arrow" />
          </motion.button>

        </div>
      </main>
    </>
  );
}

export default App;

