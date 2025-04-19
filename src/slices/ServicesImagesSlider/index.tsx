'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/**
 * Props for `ServicesImagesSlider`.
 */
export type ServicesImagesSliderProps =
  SliceComponentProps<Content.ServicesImagesSliderSlice>;

/**
 * Component for "ServicesImagesSlider" Slices.
 */

const ServicesImagesSlider: FC<ServicesImagesSliderProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !cardsContainerRef.current) return;

    const container = containerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cardElements = cardsContainer.querySelectorAll(`.${styles.card}`);
    gsap.set(cardsContainer, { x: "25vw" });

    const distance = cardsContainer.clientWidth - window.innerWidth;

    const scrollTween = gsap.to(cardsContainer, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
      start: 'top top',
        end: '+=' + distance
      }
    });

    cardElements.forEach(card => {
      const values = {
        x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
        y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
        rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1)
      };

      gsap.fromTo(card, {
        rotation: values.rotation,
        xPercent: values.x,
        yPercent: values.y
      }, {
        rotation: -values.rotation,
        xPercent: -values.x,
        yPercent: -values.y,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left 120%',
          end: 'right -20%',
          scrub: true
        }
      });
    });
  }, { scope: containerRef, dependencies: [] });



  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.horizontalSlider}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.cards} ref={cardsContainerRef}>
          {slice.primary.images.map((image, index) => (
            <div className={styles.card} key={index}>
              <PrismicNextImage field={image.image} className={styles.image} fill style={{ objectFit: 'cover' }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesImagesSlider;
