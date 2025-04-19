'use client';

import { FC, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./style.module.scss";

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Props for `ProcessSteps`.
 */
export type ProcessStepsProps = SliceComponentProps<Content.ProcessStepsSlice>;

/**
 * Component for "ProcessSteps" Slices.
 */
const ProcessSteps: FC<ProcessStepsProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    const timeline = timelineRef.current;

    if (!container || !timeline) return;

    const dots = Array.from(container.querySelectorAll(`.${styles.timelineDot}`));

    const ctx = gsap.context(() => {
      gsap.set(timeline, { height: 0 });
      gsap.set(dots, { scale: 0, opacity: 0 });

      gsap.to(timeline, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        }
      });

      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const dot = dots[index];

        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: step,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        });

      });
    }, container);

    return () => ctx.revert();
  }, [slice]);

  useEffect(() => {
    stepsRef.current = stepsRef.current.slice(0, slice.primary.steps.length);
  }, [slice.primary.steps.length]);

  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    stepsRef.current[index] = el;
  };

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.processSteps} ref={containerRef}>
      <div className={styles.titleContainer}>
        {slice.primary.eyebrow && (
          <p className={styles.eyebrow}>{slice.primary.eyebrow}</p>
        )}
        {slice.primary.title && (
          <h2 className={styles.title}>{slice.primary.title}</h2>
        )}
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timelineTrack}>
          <div className={styles.timelineLine} ref={timelineRef}></div>
          {slice.primary.steps.map((_, index) => (
            <div
              key={`dot-${index}`}
              className={styles.timelineDot}
              style={{
                top: `${index === 0 ? 0 : index === slice.primary.steps.length - 1 ? 100 :
                  (100 / (slice.primary.steps.length - 1)) * index}%`
              }}
            />
          ))}
        </div>

        <div className={styles.steps}>
          {slice.primary.steps.map((item, index) => (
            <div className={styles.step} key={index} ref={(el) => setStepRef(el, index)}>
              <div className={styles.left}>
                <h3>{item.step_name}</h3>
                {item.step_description && (<PrismicRichText field={item.step_description} />)}
              </div>
              <div className={styles.right}>
                {item.step_details.map((detail, detailIndex) => (
                  <div className={styles.detail} key={detailIndex}>
                    <span>{detail.step_details_week}</span>
                    <h4>{detail.step_details_title}</h4>
                    <p>{detail.step_details_description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;