import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Native/Atoms/Skeleton",
  component: Skeleton,
  parameters: { atomicLevel: "atom", dependsOn: [] },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text" },
};

export const Circle: Story = {
  args: { variant: "circle" },
};

export const Rect: Story = {
  args: { variant: "rect" },
};

export const NoAnimation: Story = {
  args: { animate: false },
};

export const CardExample: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Skeleton variant="rect" height={160} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </View>
  ),
};
