import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Text } from "./Text";

const meta = {
  title: "Native/Text",
  component: Text,
  args: {
    children: "Sample text",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Title: Story = {
  args: { variant: "title", children: "Product title" },
};

export const Body: Story = {
  args: { variant: "body", children: "Body copy for product descriptions." },
};

export const Caption: Story = {
  args: { variant: "caption", children: "Caption text" },
};

export const Truncated: Story = {
  args: {
    variant: "body",
    numberOfLines: 1,
    children: "A very long line of text that should be truncated to a single line.",
  },
};
