import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import navRobot from "@/assets/nav-influencer.png";

/**
 * Premium desktop-only Hero Assistant.
 * - Idle breathing + blinking
 * - Looks toward cursor, waves on hover
 * - Glassmorphism halo with electric blue + purple
 * - Click opens AuraChat (window event)
 */
export const HeroAssistant = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [blink, setBlink] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 60, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 60, damping: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / 400)));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / 400)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const open = () => window.dispatchEvent(new CustomEvent("aura:open"));

  return (
    <div
      ref={wrapRef}
      className="hidden lg:flex md:col-span-5 relative items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* Glow rings */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[840px] h-[840px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsla(220,100%,65%,0.35) 0%, hsla(270,80%,60%,0.22) 35%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      <motion.button
        type="button"
        onClick={open}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        aria-label="Talk to Nav, the NavAura AI assistant"
        className="relative group"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Glass capsule behind robot */}
        <div
          className="absolute inset-0 -m-16 rounded-[80px]"
          style={{
            background:
              "linear-gradient(135deg, hsla(220,100%,65%,0.12), hsla(270,80%,60%,0.10))",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid hsla(220,90%,75%,0.25)",
            boxShadow:
              "0 30px 80px -20px hsla(220,100%,55%,0.45), inset 0 1px 0 hsla(255,100%,100%,0.12)",
          }}
        />

        <motion.img
          src={navRobot}
          alt="Nav, NavAura AI 3D assistant"
          width={840}
          height={840}
          className="relative w-[680px] h-[680px] xl:w-[800px] xl:h-[800px] object-contain drop-shadow-[0_25px_45px_hsla(220,100%,50%,0.45)] pointer-events-none"
          style={{ filter: blink ? "brightness(0.85) saturate(1.1)" : "none" }}
          animate={
            hovering
              ? { rotate: [0, -10, 14, -8, 10, 0], scale: 1.05 }
              : { rotate: [0, -1.5, 1.5, 0], scale: [1, 1.015, 1] }
          }
          transition={
            hovering
              ? { duration: 1.1, ease: "easeInOut" }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
          draggable={false}
        />

        {/* Status chip */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{
            background: "hsla(222,30%,8%,0.65)",
            backdropFilter: "blur(14px)",
            borderColor: "hsla(220,90%,70%,0.4)",
            boxShadow: "0 0 24px hsla(220,100%,60%,0.35)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: "hsl(220,100%,65%)" }} />
            <span className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "hsl(220,100%,65%)" }} />
          </span>
          <span className="text-[10px] uppercase tracking-luxe text-white/85">Nav · Online · Tap to chat</span>
        </div>
      </motion.button>
    </div>
  );
};
