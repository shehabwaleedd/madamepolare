import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss"
import Icon from "@/ui/doubleButton/icon";

/**
 * Props for `CtaButtons`.
 */
export type CtaButtonsProps = SliceComponentProps<Content.CtaButtonsSlice>;

/**
 * Component for "CtaButtons" Slices.
 */
const CtaButtons: FC<CtaButtonsProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.ctaButtons}>
      {slice.primary.cta_button.map((item, index) => (
        <div className={styles.ctaButton} key={index} style={{ backgroundColor: item.cta_background_color || "#ffffff", color: item.cta_text_color || "#000000" }}>
          <div className={styles.ctaTop}>
            <h4> {item.cta_title} </h4>
            <span> {item.cta_subtitle} </span>
          </div>
          <Icon />
          <div className={styles.ctaBottom}>
            <h5> {item.cta_header} </h5>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CtaButtons;
