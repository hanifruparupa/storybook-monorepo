import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Web/Button",
  component: Button,
  args: {
    label: "Button",
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "reset"
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

/**
 * Responsive size — resize the browser to see the size change.
 */
export const Responsive: Story = {
  args: {
    size: { xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" },
  },
};
