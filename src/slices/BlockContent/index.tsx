'use client'
import { FC, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss"
import DoubleButton from "@/ui/doubleButton";

/**
 * Props for `BlockContent`.
 */
export type BlockContentProps = SliceComponentProps<Content.BlockContentSlice>;

/**
 * Component for "BlockContent" Slices.
 */


const BlockContent: FC<BlockContentProps> = ({ slice }) => {


  useEffect(() => {
    console.log(slice.primary.right_paragraphes, "Paragraphs");
  }, [slice]);

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.blockContent}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <h5>{slice.primary.left_paragraph}</h5>
          {slice.primary.show_cta && ( <DoubleButton field={slice.primary.cta} type="arrowRight" className={styles.button} /> )}
        </div>
        <div className={styles.right}>
          <div className={styles.paragraphWrapper}>
              {slice.primary.right_paragraphes.map((item, index) => (
                <p key={index} className={styles.paragraph}>
                  {item.paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockContent;
