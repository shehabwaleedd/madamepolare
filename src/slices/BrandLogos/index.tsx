import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./style.module.scss";

/**
 * Props for `BrandLogos`.
 */
export type BrandLogosProps = SliceComponentProps<Content.BrandLogosSlice>;

/**
 * Component for "BrandLogos" Slices.
 */
const BrandLogos: FC<BrandLogosProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.brandLogos}>
      <div className={styles.container}>
        <div className={styles.header}>
          {slice.primary.eyebrow && (
            <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>
          )}
          {slice.primary.main_title && (
            <h2 className={styles.title}>{slice.primary.main_title}</h2>
          )}
        </div>
        <div className={styles.logosGrid}>
          {slice.primary.logos?.map((item, index) => (
            <div className={styles.logoItem} key={index}>
              {item.logo_image && (
                <PrismicNextImage field={item.logo_image} alt={String(item.logo_image.alt || "") as ''} className={styles.logoImage} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;