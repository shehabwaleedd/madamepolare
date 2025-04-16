"use client";
import React, { useRef, useEffect, FC, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowWidth";
import { motion, useScroll, useTransform, useSpring, MotionStyle } from "framer-motion";
import { CSSProperties } from "react";

import styles from "./style.module.scss";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  fit?: "cover" | "contain" | "fill";
}

const ParallaxImage: FC<ParallaxImageProps> = ({ src, alt, speed = 0.3, fit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { windowHeight, isDesktop } = useWindowSize();
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  const updateMeasurements = useCallback(() => {
    if (!containerRef.current || !isDesktop) return;

    const rect = containerRef.current.getBoundingClientRect();
    setElementTop(rect.top + window.scrollY);
    setElementHeight(rect.height);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [isDesktop, updateMeasurements]);

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, (latest) => {
    if (!isDesktop) return 0;

    const windowCenter = latest + windowHeight / 2;
    const elementCenter = elementTop + elementHeight / 2;
    const distanceFromCenter = windowCenter - elementCenter;

    return distanceFromCenter * speed;
  });

  const springConfig = useMemo(() => ({
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  }), []);

  const springY = useSpring(y, springConfig);

  const imageStyles = useMemo<CSSProperties>(() => ({
    width: "100%",
    height: "100%",
    objectFit: fit,
    position: "absolute",
    top: 0,
    left: 0
  }), []);

  const motionDivStyles = useMemo<MotionStyle>(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    y: springY,
    scale: 1.5
  }), [springY]);

  return (
    <div ref={containerRef} className={styles.parallaxWrapper}>
      {isDesktop ? (
        <motion.div style={motionDivStyles}>
          <Image src={src} alt={alt} width={1900} height={1080} style={imageStyles} priority />
        </motion.div>
      ) : (
        <Image src={src} alt={alt} width={1000} height={1000} style={imageStyles} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />)}
    </div>
  );
};

export default ParallaxImage;