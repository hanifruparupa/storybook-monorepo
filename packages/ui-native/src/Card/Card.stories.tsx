import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Card } from "./Card";
import { Text } from "../Text/Text";

const meta = {
  title: "Native/Card",
  component: Card,
  args: {
    children: <Text>Card content</Text>,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: { variant: "plain" },
};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Elevated: Story = {
  args: { variant: "elevated" },
};
