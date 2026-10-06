import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Web/Card",
  component: Card,
  args: {
    children: "Card content goes here",
    variant: "outlined",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["plain", "outlined", "elevated"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
};
