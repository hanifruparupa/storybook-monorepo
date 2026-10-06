import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "./Price";

const meta = {
  title: "Web/Price",
  component: Price,
  args: {
    price: 2699000,
    originalPrice: 3599000,
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDiscount: Story = {};

export const NoDiscount: Story = {
  args: {
    price: 899000,
    originalPrice: undefined,
  },
};

export const Abbreviated: Story = {
  args: {
    price: 900000,
    originalPrice: undefined,
    abbreviate: true,
  },
};

export const ExplicitPercent: Story = {
  args: {
    price: 1999000,
    originalPrice: 2499000,
    discountPercent: 20,
  },
};
