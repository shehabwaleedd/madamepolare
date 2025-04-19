import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./style.module.scss";
import Icon from '@/ui/doubleButton/icon';
import DoubleButton from "@/ui/doubleButton";

export type HeroProps = SliceComponentProps<Content.HeroSectionSlice>;

const HeroSection: FC<HeroProps> = ({ slice }) => {
  const { primary } = slice;

  const maxVisibleAvatars = primary.max_visible_avatars || 3;
  const showPlusSign = primary.show_plus_sign !== false;

  const avatarImages = primary.avatars || [];

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.row}>
          <h2>{primary.first_row_heading || "All-in-one"}</h2>
          {primary.main_image?.url && (
            <PrismicNextImage field={primary.main_image} className={styles.rowImage} />
          )}
        </div>

        <div className={styles.row}>
          <h2>{primary.second_row_heading_before || "Creative"}</h2>

          {avatarImages.length > 0 && (
            <div className={styles.avatars}>
              <div className={styles.avatarContainer}>
                {avatarImages.slice(0, maxVisibleAvatars).map((avatar, index) => {
                  const isLast = index === Math.min(maxVisibleAvatars, avatarImages.length) - 1;
                  return (<PrismicNextImage key={index} field={avatar.avatar_image} className={styles.avatar} style={{ left: `${index * 48}px`, zIndex: maxVisibleAvatars - index, boxShadow: isLast ? '5px 0 10px rgba(0, 0, 0, 0.2)' : 'none' }} />);
                })}
              </div>
              {showPlusSign && avatarImages.length > maxVisibleAvatars && (
                <div className={styles.plusSign}>+</div>
              )}
            </div>
          )}

          <h2>{primary.second_row_heading_after || "& Design"}</h2>
        </div>

        <div className={styles.row}>
          <h2>{primary.third_row_heading || "Agency"}</h2>
          {primary.icon_type && (
            <Icon type={primary.icon_type} />
          )}
        </div>

      </div>
      {primary.button_text && (
        <DoubleButton buttonTitle={primary.button_text} />
      )}
    </section>
  );
};

export default HeroSection;