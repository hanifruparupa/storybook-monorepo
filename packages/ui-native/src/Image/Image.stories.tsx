import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Image } from "./Image";

const meta = {
  title: "Native/Image",
  component: Image,
  args: {
    source: "https://picsum.photos/seed/purifier/600/600",
    alt: "Product image",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start", gap: 12, width: 280 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: { aspectRatio: 1 },
};

export const Wide: Story = {
  args: { aspectRatio: 16 / 9 },
};

export const Rounded: Story = {
  args: { aspectRatio: 1, radius: 16 },
};
