import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Rating } from "./Rating";

const meta = {
  title: "Native/Rating",
  component: Rating,
  args: {
    value: 4.8,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ValueOnly: Story = {
  args: { value: 4.8 },
};

export const WithReviews: Story = {
  args: { value: 4.8, reviewCount: 120 },
};

export const Low: Story = {
  args: { value: 3.2, reviewCount: 15 },
};
