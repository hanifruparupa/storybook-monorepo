import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import { View } from "react-native";
import { ProductCard } from "./ProductCard";

const meta = {
  title: "Native/ProductCard",
  component: ProductCard,
  args: {
    imageUrl: "https://picsum.photos/seed/purifier/600/600",
    imageAlt: "Air purifier",
    title: "Notrium Air Purifier Dengan Meja 30 m2 CADR 260 m3/jam",
    badgeLabel: "2 Tipe",
    price: 1899000,
    rating: 5,
    reviewCount: 13,
    onPress: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDiscount: Story = {
  args: {
    originalPrice: 2699000,
    discountPercent: 6,
  },
};

export const WithPromo: Story = {
  args: {
    promoText: "Harga spesial ruparupa rewar…",
  },
};

export const WithoutRating: Story = {
  args: {
    rating: undefined,
    reviewCount: undefined,
  },
};

export const Minimal: Story = {
  args: {
    badgeLabel: undefined,
    rating: undefined,
    reviewCount: undefined,
  },
};

export const WithCashback: Story = {
  args: {
    cashback: { amount: 900000 },
  },
};

export const WithCashbackAndShipping: Story = {
  args: {
    cashback: { amount: 900000, freeShipping: true },
  },
};

/** Interaction: clicking the card fires onPress. */
export const ClickCallsOnPress: Story = {
  args: { onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/** Content: the title and formatted price are rendered. */
export const ShowsTitleAndPrice: Story = {
  args: {
    title: "Krisbow Sync Smart Air Purifier 48 m2 CADR 400 m3/jam",
    price: 2699000,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Krisbow Sync Smart Air Purifier/),
    ).toBeInTheDocument();
    await expect(canvas.getByText("Rp2.699.000")).toBeInTheDocument();
  },
};
