import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta = {
  title: "Web/Atoms/Rating",
  component: Rating,
  parameters: {
    atomicLevel: "atom",
    dependsOn: [],
  },
  args: {
    value: 4.8,
    reviewCount: 120,
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutReviews: Story = {
  args: {
    value: 4.5,
    reviewCount: undefined,
  },
};

export const LowRating: Story = {
  args: {
    value: 3.2,
    reviewCount: 14,
  },
};
