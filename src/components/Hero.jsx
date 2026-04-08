import React, { useEffect, useMemo, useRef } from "react";
import Section from "./ui/Section";
import { CALENDLY_LINK } from "../config/constants";

const RINGS = [
  { radiusX: 130, radiusY: 88, count: 18, width: 10, opacity: 0.96, drift: 18 },
  { radiusX: 210, radiusY: 145, count: 28, width: 9, opacity: 0.82, drift: 24 },
  { radiusX: 310, radiusY: 220, count: 38, width: 8, opacity: 0.68, drift: 30 },
  { radiusX: 430, radiusY: 300, count: 52, width: 7, opacity: 0.54, drift: 38 },
  { radiusX: 560, radiusY: 390, count: 66, width: 5, opacity: 0.28, drift: 46 },
];

function getParticleColor(normalizedAngle, seed) {
  if (normalizedAngle < 0.22) {
    return ["#2563eb", "#3b82f6", "#6366f1"][seed % 3];
  }

  if (normalizedAngle < 0.48) {
    return ["#6366f1", "#8b5cf6", "#ec4899"][seed % 3];
  }

  if (normalizedAngle < 0.72) {
    return ["#f43f5e", "#f97316", "#facc15"][seed % 3];
  }

  return ["#2563eb", "#60a5fa", "#8b5cf6"][seed % 3];
}

function createParticles() {
  const particles = [];

  RINGS.forEach((ring, ringIndex) => {
    for (let index = 0; index < ring.count; index += 1) {
      const progress = index / ring.count;
      const angle = progress * Math.PI * 2 - Math.PI / 2 + ringIndex * 0.15;
      const x = Math.cos(angle) * ring.radiusX + ((((index * 19) % 17) - 8) * 2.1);
      const y = Math.sin(angle) * ring.radiusY + ((((index * 11) % 13) - 6) * 1.8);
      const rotation = (angle * 180) / Math.PI + 90;
      const normalizedAngle = (angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);

      particles.push({
        id: `${ringIndex}-${index}`,
        x,
        y,
        width: ring.width,
        height: Math.max(2, ring.width * 0.26),
        rotation,
        opacity: ring.opacity,
        color: getParticleColor(normalizedAngle / (Math.PI * 2), index + ringIndex),
        driftX: Math.cos(angle) * ring.drift + (((index * 5) % 7) - 3) * 1.4,
        driftY: Math.sin(angle) * ring.drift * 0.7 + (((index * 7) % 9) - 4) * 1.2,
        duration: `${6.5 + ringIndex * 0.85 + (index % 5) * 0.4}s`,
        delay: `${(index % 11) * -0.55}s`,
      });
    }
  });

  return particles;
}

function createSpecks() {
  return Array.from({ length: 150 }, (_, index) => ({
    id: index,
    left: `${(index * 11.7) % 100}%`,
    top: `${(index * 7.9 + (index % 9) * 3.8) % 100}%`,
    size: index % 8 === 0 ? 2 : 1.4,
    opacity: index % 6 === 0 ? 0.22 : 0.1,
    delay: `${(index % 10) * -0.7}s`,
    duration: `${7 + (index % 5)}s`,
  }));
}

export default function Hero() {
  const heroRef = useRef(null);
  const cloudRef = useRef(null);
  const orbRef = useRef(null);
  const particles = useMemo(() => createParticles(), []);
  const specks = useMemo(() => createSpecks(), []);

  useEffect(() => {
    const hero = heroRef.current;
    const cloud = cloudRef.current;
    const orb = orbRef.current;

    if (!hero || !cloud || !orb) return undefined;

    const target = { x: 0, y: 0 };
    const cloudCurrent = { x: 0, y: 0 };
    const orbCurrent = { x: 0, y: 0 };
    const orbVelocity = { x: 0, y: 0 };
    let rafId = 0;
    let hovering = false;
    let startTime = 0;

    const getDefaultPosition = () => ({
      x: hero.clientWidth * 0.56,
      y: hero.clientHeight * 0.42,
    });

    const setCloudPosition = (x, y) => {
      cloud.style.left = `${x}px`;
      cloud.style.top = `${y}px`;
    };

    const setOrbPosition = (x, y, elapsed) => {
      const wobbleX = Math.cos(elapsed * 0.0013) * 10 + Math.sin(elapsed * 0.0007) * 6;
      const wobbleY = Math.sin(elapsed * 0.0016) * 8 + Math.cos(elapsed * 0.001) * 4;
      const stretch = 1 + Math.min(0.12, Math.hypot(orbVelocity.x, orbVelocity.y) * 0.0022);
      const squish = 1 - Math.min(0.08, Math.hypot(orbVelocity.x, orbVelocity.y) * 0.0014);
      const rotate = orbVelocity.x * 0.08;

      orb.style.left = `${x + wobbleX}px`;
      orb.style.top = `${y + wobbleY}px`;
      orb.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${stretch}, ${squish})`;
    };

    const resetTarget = () => {
      const next = getDefaultPosition();
      target.x = next.x;
      target.y = next.y;

      if (!cloudCurrent.x && !cloudCurrent.y) {
        cloudCurrent.x = next.x;
        cloudCurrent.y = next.y;
        orbCurrent.x = next.x;
        orbCurrent.y = next.y;
        setCloudPosition(cloudCurrent.x, cloudCurrent.y);
        setOrbPosition(orbCurrent.x, orbCurrent.y, 0);
      }
    };

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      const idleScale = hovering ? 0.65 : 1;
      const cloudDriftX =
        (Math.sin(elapsed * 0.00078) * 22 + Math.cos(elapsed * 0.00113) * 14) * idleScale;
      const cloudDriftY =
        (Math.cos(elapsed * 0.00064) * 18 + Math.sin(elapsed * 0.00102) * 12) * idleScale;
      const orbDriftX =
        (Math.cos(elapsed * 0.00148) * 18 + Math.sin(elapsed * 0.0021) * 8) * idleScale;
      const orbDriftY =
        (Math.sin(elapsed * 0.00172) * 14 + Math.cos(elapsed * 0.00118) * 7) * idleScale;

      const desiredCloudX = target.x + cloudDriftX;
      const desiredCloudY = target.y + cloudDriftY;
      const desiredOrbX = target.x + orbDriftX;
      const desiredOrbY = target.y + orbDriftY;

      const cloudEase = hovering ? 0.1 : 0.065;
      cloudCurrent.x += (desiredCloudX - cloudCurrent.x) * cloudEase;
      cloudCurrent.y += (desiredCloudY - cloudCurrent.y) * cloudEase;

      const spring = hovering ? 0.05 : 0.03;
      const damping = hovering ? 0.82 : 0.86;

      orbVelocity.x += (desiredOrbX - orbCurrent.x) * spring;
      orbVelocity.y += (desiredOrbY - orbCurrent.y) * spring;
      orbVelocity.x *= damping;
      orbVelocity.y *= damping;
      orbCurrent.x += orbVelocity.x;
      orbCurrent.y += orbVelocity.y;

      setCloudPosition(cloudCurrent.x, cloudCurrent.y);
      setOrbPosition(orbCurrent.x, orbCurrent.y, elapsed);
      rafId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      hovering = true;
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };

    const handleLeave = () => {
      hovering = false;
      resetTarget();
    };

    const handleResize = () => {
      if (!hovering) {
        resetTarget();
      }
    };

    resetTarget();
    rafId = window.requestAnimationFrame(animate);

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Section className="relative overflow-hidden bg-white px-4 pb-36 pt-8 sm:px-6 lg:px-8 lg:pb-44 lg:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_#ffffff_0%,_#ffffff_78%,_#f7f7ff_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[88rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(191,219,254,0.58)_0%,_rgba(255,255,255,0)_72%)]" />

      <div
        ref={heroRef}
        className="relative left-1/2 min-h-[760px] w-screen -translate-x-1/2 overflow-hidden lg:min-h-[840px]"
      >
        <div className="pointer-events-none absolute inset-0">
          {specks.map((speck) => (
            <span
              key={speck.id}
              className="hero-speck absolute rounded-full bg-slate-950"
              style={{
                "--speck-opacity": speck.opacity,
                left: speck.left,
                top: speck.top,
                width: `${speck.size}px`,
                height: `${speck.size}px`,
                opacity: speck.opacity,
                animationDelay: speck.delay,
                animationDuration: speck.duration,
              }}
            />
          ))}
        </div>

        <div
          ref={cloudRef}
          className="pointer-events-none absolute h-[1160px] w-[1160px] -translate-x-1/2 -translate-y-1/2"
          style={{ left: "56%", top: "42%" }}
        >
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="hero-cloud-particle absolute left-1/2 top-1/2 rounded-full"
              style={{
                "--tx": `${particle.x}px`,
                "--ty": `${particle.y}px`,
                "--dx": `${particle.driftX}px`,
                "--dy": `${particle.driftY}px`,
                "--rot": `${particle.rotation}deg`,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                opacity: particle.opacity,
                backgroundColor: particle.color,
                boxShadow: `0 0 12px ${particle.color}22`,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div
          ref={orbRef}
          className="pointer-events-none absolute h-52 w-52 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "56%", top: "42%" }}
        >
          <div className="hero-orb-glow absolute inset-0 rounded-full" />
          <div className="hero-orb-core absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/95 shadow-[0_18px_40px_-24px_rgba(37,99,235,0.55)]">
            <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,1)_0%,_rgba(219,234,254,0.92)_46%,_rgba(96,165,250,0.45)_100%)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1500px] flex-col items-center justify-center px-4 text-center sm:px-6 lg:min-h-[840px] lg:px-8">
          <h1 className="mt-8 max-w-[1320px] text-[clamp(4rem,8.6vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.085em] text-slate-950">
            Impulsá ventas y operación
            <br />
            con sistemas que se mueven solos.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Automatización, IA e integraciones para que tu equipo gane velocidad,
            orden y foco comercial sin depender de tareas manuales.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-lg font-semibold text-white shadow-[0_24px_60px_-22px_rgba(15,23,42,0.5)] transition-transform duration-200 hover:scale-[1.02]"
            >
              Hablemos
            </a>

            <a
              href="#servicios"
              className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-slate-200 bg-white/90 px-8 py-4 text-lg font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:text-slate-950"
            >
              Explorar servicios
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative hidden h-[120px] w-full rotate-180 lg:block"
          fill="#0f0c29"
        >
          <path d="M0,0 H1200 V60 C1000,10 800,110 600,60 C400,10 200,110 0,60 Z" />
        </svg>
      </div>
    </Section>
  );
}
