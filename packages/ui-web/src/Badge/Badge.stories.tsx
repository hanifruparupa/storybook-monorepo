import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Web/Badge",
  component: Badge,
  args: {
    label: "Badge",
    variant: "neutral",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "discount", "info", "chip"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    label: "2 Pilihan Isi Set",
  },
};

export const Discount: Story = {
  args: {
    label: "25%",
    variant: "discount",
  },
};

export const Info: Story = {
  args: {
    label: "Harga spesial ruparupa rewards",
    variant: "info",
  },
};

export const Chip: Story = {
  args: {
    label: "Gratis Ongkir",
    variant: "chip",
  },
};
