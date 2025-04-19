import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for service_offerings (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ServiceOfferings;
