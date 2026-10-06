import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { TextInput } from "./TextInput";

const searchIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="4.5" />
    <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" />
  </svg>
);

const clearIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="4" y1="4" x2="12" y2="12" />
    <line x1="12" y1="4" x2="4" y2="12" />
  </svg>
);

const meta = {
  title: "Web/TextInput",
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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "We'll never share it",
  },
};

export const WithError: Story = {
  args: {
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: searchIcon,
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: clearIcon,
    onRightIconPress: fn(),
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: searchIcon,
    rightIcon: clearIcon,
    onRightIconPress: fn(),
  },
};
