import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Badge } from "./Badge";

const meta = {
  title: "Native/Badge",
  component: Badge,
  args: {
    label: "Badge",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { variant: "neutral", label: "New" },
};

export const Discount: Story = {
  args: { variant: "discount", label: "20%" },
};

export const Info: Story = {
  args: { variant: "info", label: "Free shipping" },
};

export const Chip: Story = {
  args: { variant: "chip", label: "Chip" },
};
