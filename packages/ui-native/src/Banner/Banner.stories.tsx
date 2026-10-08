import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { View } from "react-native";
import { Banner } from "./Banner";

const meta = {
  title: "Native/Molecules/Banner",
  component: Banner,
  parameters: { atomicLevel: "molecule", dependsOn: ["Image"] },
  args: {
    slides: [
      { imageUrl: "https://picsum.photos/seed/banner1/1200/675", alt: "Banner 1" },
      { imageUrl: "https://picsum.photos/seed/banner2/1200/675", alt: "Banner 2" },
      { imageUrl: "https://picsum.photos/seed/banner3/1200/675", alt: "Banner 3" },
    ],
    duration: 3000,
    transition: "slide",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 360 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["!test"],
};

export const Slow: Story = {
  tags: ["!test"],
  args: { duration: 5000 },
};

export const Paused: Story = {
  args: { autoPlay: false },
};

export const SingleSlide: Story = {
  args: {
    slides: [{ imageUrl: "https://picsum.photos/seed/banner1/1200/675", alt: "Banner 1" }],
  },
};

export const RendersDots: Story = {
  args: { autoPlay: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId(/^banner-dot-/)).toHaveLength(3);
  },
};

export const Fade: Story = { args: { transition: "fade", autoPlay: false } };
export const NoTransition: Story = { args: { transition: "none", autoPlay: false } };
