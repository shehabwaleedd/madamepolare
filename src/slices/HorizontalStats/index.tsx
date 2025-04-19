'use client';

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./style.module.scss";

export type HorizontalStatsProps = SliceComponentProps<Content.HorizontalStatsSlice>;

const CountingNumber = ({ value, suffix }: { value: string; suffix: string }) => {
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div className={styles.statValue}>
      {isNumeric ? (
        <motion.span initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <CountUp from={0} to={numericValue} duration={2} />
          </motion.span>
          {suffix}
        </motion.span>
      ) : (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {value}{suffix}
        </motion.span>
      )}
    </motion.div>
  );
};

const CountUp = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const counter = useRef({
    value: from
  });

  useAnimationFrame(() => {
    if (!nodeRef.current) return;

    if (counter.current.value < to) {
      counter.current.value = Math.min(
        counter.current.value + (to - from) / (duration * 60),
        to
      );

      if (nodeRef.current) {
        nodeRef.current.textContent = Math.round(counter.current.value).toString();
      }
    } else {
      if (nodeRef.current) {
        nodeRef.current.textContent = to.toString();
      }
    }
  });

  return <span ref={nodeRef}>{from}</span>;
};

const HorizontalStats: FC<HorizontalStatsProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className={styles.horizontalStats} ref={containerRef} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className={styles.statsContainer}>
        {slice.primary.rows.map((row, index) => (
          <motion.div className={styles.statsRow} key={index} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <div className={styles.rowTitle}><h3>{row.row_title}</h3></div>
            {isInView && (
              <CountingNumber value={row.stat_number || "0"} suffix={row.sign || ""} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalStats;