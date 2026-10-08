import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Text, View } from "react-native";
import { IconButton } from "./IconButton";

const meta = {
  title: "Native/Atoms/IconButton",
  component: IconButton,
  parameters: {
    atomicLevel: "atom",
    dependsOn: [],
  },
  args: {
    icon: <Text>＋</Text>,
    accessibilityLabel: "Add to cart",
    onPress: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

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

export const ClickCallsOnPress: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Add to cart" }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const DisabledDoesNotFire: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Add to cart" });
    // RNW sets pointer-events:none on a disabled Pressable, so assert state.
    await expect(button).toBeDisabled();
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
