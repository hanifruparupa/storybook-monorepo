import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { ProductCard } from "./ProductCard";

const meta = {
  title: "Web/ProductCard",
  component: ProductCard,
  args: {
    imageUrl: "https://picsum.photos/seed/purifier/600/600",
    imageAlt: "Air purifier",
    title: "Krisbow Sync Smart Air Purifier 48 m2 CADR 400 m3/jam",
    badgeLabel: "2 Pilihan Isi Set",
    price: 2699000,
    originalPrice: 2899000,
    promoText: "Harga spesial ruparupa rewar…",
    rating: 4.9,
    reviewCount: 60,
    onPress: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutPromo: Story = {
  args: {
    promoText: undefined,
  },
};

export const WithoutRating: Story = {
  args: {
    rating: undefined,
    reviewCount: undefined,
  },
};

export const NoDiscount: Story = {
  args: {
    originalPrice: undefined,
    discountPercent: undefined,
  },
};

export const Simple: Story = {
  args: {
    badgeLabel: undefined,
    originalPrice: undefined,
    discountPercent: undefined,
    promoText: undefined,
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
