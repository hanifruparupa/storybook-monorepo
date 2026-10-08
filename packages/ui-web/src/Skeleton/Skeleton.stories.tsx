import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Web/Atoms/Skeleton",
  component: Skeleton,
  parameters: { atomicLevel: "atom", dependsOn: [] },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Circle: Story = {
  args: {
    variant: "circle",
  },
};

export const Rect: Story = {
  args: {
    variant: "rect",
  },
};

export const NoAnimation: Story = {
  args: {
    animate: false,
  },
};

export const CardExample: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Skeleton variant="rect" height={160} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  ),
};
