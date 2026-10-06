import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Text, View } from "react-native";
import { TextInput } from "./TextInput";

const meta = {
  title: "Native/TextInput",
  component: TextInput,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    value: "",
    onChangeText: fn(),
  },
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "text" },
    helperText: { control: "text" },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "This is helper text.",
  },
};

export const WithError: Story = {
  args: {
    error: "This field is required.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Text>🔍</Text>,
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Text>✕</Text>,
    onRightIconPress: fn(),
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Text>🔍</Text>,
    rightIcon: <Text>✕</Text>,
    onRightIconPress: fn(),
  },
};
