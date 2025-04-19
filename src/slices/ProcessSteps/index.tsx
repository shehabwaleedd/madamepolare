import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProcessSteps`.
 */
export type ProcessStepsProps = SliceComponentProps<Content.ProcessStepsSlice>;

/**
 * Component for "ProcessSteps" Slices.
 */
const ProcessSteps: FC<ProcessStepsProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for process_steps (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ProcessSteps;
