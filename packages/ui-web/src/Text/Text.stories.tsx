import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Web/Text",
  component: Text,
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "body",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["title", "body", "caption", "price", "priceOriginal", "label"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};

export const Title: Story = {
  args: {
    variant: "title",
    children: "Water Purifier with Mineral Boost",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Free shipping for orders over Rp500 ribu",
  },
};

export const Truncated: Story = {
  args: {
    numberOfLines: 1,
    children:
      "This is a very long product title that should truncate to a single line with an ellipsis at the end",
  },
};
