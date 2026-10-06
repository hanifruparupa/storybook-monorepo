import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Text, View } from "react-native";
import { TextInput, type NativeTextInputProps } from "./TextInput";

/** Stateful wrapper so interaction tests can type into a controlled input. */
function StatefulTextInput(props: NativeTextInputProps) {
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
function ClearableTextInput(props: NativeTextInputProps) {
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

/** Interaction: typing updates the controlled value and calls `onChangeText`. */
export const TypingUpdatesValue: Story = {
  args: { label: "Full name", placeholder: "Jane Doe", value: "" },
  render: (args) => <StatefulTextInput {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Full name");
    await userEvent.type(input, "Jane Doe");
    await expect(input).toHaveValue("Jane Doe");
    await expect(args.onChangeText).toHaveBeenCalledWith("Jane Doe");
  },
};

/** Interaction: the right icon fires its handler. */
export const ClearRightIcon: Story = {
  args: {
    label: "Search",
    value: "Hello",
    rightIcon: <Text>✕</Text>,
    onRightIconPress: fn(),
  },
  render: (args) => <ClearableTextInput {...args} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onRightIconPress).toHaveBeenCalled();
  },
};

/** Interaction: a disabled field cannot be typed into. */
export const DisabledIsNotEditable: Story = {
  args: { label: "Full name", value: "", disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Full name");
    await userEvent.type(input, "nope");
    await expect(args.onChangeText).not.toHaveBeenCalled();
  },
};

/** A11y: the field is labelled and the error message is rendered. */
export const ErrorIsAnnounced: Story = {
  args: { label: "Email", value: "", error: "Email is required" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Email")).toBeInTheDocument();
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
  },
};
