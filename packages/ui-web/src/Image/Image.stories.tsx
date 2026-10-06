import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta = {
  title: "Web/Image",
  component: Image,
  args: {
    source: "https://picsum.photos/seed/purifier/600/600",
    alt: "Water purifier product photo",
    aspectRatio: 1,
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {};

export const Wide: Story = {
  args: {
    source: "https://picsum.photos/seed/purifier-wide/800/450",
    aspectRatio: 16 / 9,
  },
};

export const Rounded: Story = {
  args: {
    radius: 16,
  },
};
