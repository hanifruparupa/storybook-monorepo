import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
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
