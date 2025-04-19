import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss";

/**
 * Props for `ServiceHero`.
 */
export type ServiceHeroProps = SliceComponentProps<Content.ServiceHeroSlice>;

/**
 * Component for "ServiceHero" Slices.
 */
const ServiceHero: FC<ServiceHeroProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.serviceHero}>
      <h1>{slice.primary.service_title}</h1>
    </section>
  );
};

export default ServiceHero;
