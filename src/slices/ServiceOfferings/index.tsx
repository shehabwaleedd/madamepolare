import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss";
/**
 * Props for `ServiceOfferings`.
 */
export type ServiceOfferingsProps =
  SliceComponentProps<Content.ServiceOfferingsSlice>;

/**
 * Component for "ServiceOfferings" Slices.
 */
const ServiceOfferings: FC<ServiceOfferingsProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.serviceOfferings}>
      {slice.primary.service_offerings.map((offer, index) => (
        <div className={styles.grid} key={index}>
          <div className={styles.left}>
            <h3>{offer.offering_title}</h3>
            <p>{offer.offering_description}</p>
          </div>
          <div className={styles.right}>
            {offer.sub_offerings.map((subOffer, subIndex) => (
              <div className={styles.subOffering} key={subIndex}>
                <h4>{subOffer.sub_offering_title}</h4>
                <p>{subOffer.sub_offering_description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

    </section>
  );
};

export default ServiceOfferings;
