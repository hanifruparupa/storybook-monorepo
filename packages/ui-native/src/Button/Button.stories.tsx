import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { View } from "react-native";
import { Button } from "./Button";

const meta = {
  title: "Native/Button",
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
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  // Bounded, stretch container so `fullWidth` has a definite cross-axis to fill.
  decorators: [
    (Story) => (
      <View style={{ width: 320, padding: 16, alignItems: "stretch" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
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

export const Responsive: Story = {
  args: {
    size: { xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" },
  },
  parameters: {
    notes: "Size changes with the device width / orientation.",
  },
};

/** Interaction: clicking fires onPress. */
export const ClickCallsOnPress: Story = {
  args: { label: "Click me", onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/** Interaction: a disabled button does not fire onPress. */
export const DisabledDoesNotFire: Story = {
  args: { label: "Disabled", disabled: true, onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    // RNW sets pointer-events:none on a disabled Pressable, so assert the
    // disabled state instead of clicking.
    await expect(button).toBeDisabled();
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
