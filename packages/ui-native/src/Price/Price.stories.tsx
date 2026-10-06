import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Price } from "./Price";

const meta = {
  title: "Native/Price",
  component: Price,
  args: {
    price: 199000,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Price>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CurrentOnly: Story = {
  args: { price: 199000 },
};

export const WithOriginal: Story = {
  args: { price: 159000, originalPrice: 199000 },
};

export const WithDiscount: Story = {
  args: { price: 159000, originalPrice: 199000, discountPercent: 20 },
};

export const Abbreviated: Story = {
  args: { price: 1500000, abbreviate: true },
};
