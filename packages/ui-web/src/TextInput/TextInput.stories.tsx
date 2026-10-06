import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { TextInput, type WebTextInputProps } from "./TextInput";

/** Stateful wrapper so interaction tests can type into a controlled input. */
function StatefulTextInput(props: WebTextInputProps) {
  const [value, setValue] = React.useState(props.value);
  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={(text) => {
        props.onChangeText?.(text);
        setValue(text);
      }}
    />
  );
}

/** Stateful wrapper that also clears the value from the right icon. */
function ClearableTextInput(props: WebTextInputProps) {
  const [value, setValue] = React.useState(props.value);
  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={(text) => {
        props.onChangeText?.(text);
        setValue(text);
      }}
      onRightIconPress={() => {
        props.onRightIconPress?.();
        setValue("");
      }}
    />
  );
}

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

/**
 * Interaction: typing updates the controlled value and calls `onChangeText`.
 */
export const TypingUpdatesValue: Story = {
  args: { label: "Full name", placeholder: "Jane Doe", value: "" },
  render: (args) => <StatefulTextInput {...args} />,
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Full name");
    await step("type a name", async () => {
      await userEvent.type(input, "Jane Doe");
    });
    await expect(input).toHaveValue("Jane Doe");
    await expect(args.onChangeText).toHaveBeenCalledWith("Jane Doe");
  },
};

/** Interaction: the right icon clears the value and fires its handler. */
export const ClearRightIcon: Story = {
  args: {
    label: "Search",
    value: "Hello",
    rightIcon: clearIcon,
    onRightIconPress: fn(),
  },
  render: (args) => <ClearableTextInput {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Search");
    await expect(input).toHaveValue("Hello");
    await userEvent.click(canvas.getByRole("button"));
    await expect(input).toHaveValue("");
    await expect(args.onRightIconPress).toHaveBeenCalled();
  },
};

/** Interaction: a disabled field cannot be typed into. */
export const DisabledIsNotEditable: Story = {
  args: { label: "Full name", value: "", disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Full name");
    await expect(input).toBeDisabled();
    await userEvent.type(input, "nope");
    await expect(args.onChangeText).not.toHaveBeenCalled();
  },
};

/** A11y: an invalid field exposes `aria-invalid` and its error message. */
export const ErrorIsAccessible: Story = {
  args: { label: "Email", value: "", error: "Email is required" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  },
};
