import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StickyServices`.
 */
export type StickyServicesProps =
  SliceComponentProps<Content.StickyServicesSlice>;

/**
 * Component for "StickyServices" Slices.
 */
const StickyServices: FC<StickyServicesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for sticky_services (variation: {slice.variation})
      Slices
    </section>
  );
};

export default StickyServices;
