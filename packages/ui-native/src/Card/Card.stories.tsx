import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Card } from "./Card";
import { Text } from "../Text/Text";

const meta = {
  title: "Native/Atoms/Card",
  component: Card,
  args: {
    children: <Text>Card content</Text>,
  },
  parameters: { atomicLevel: "atom", dependsOn: ["Text", "Image"] },
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

export const WithSections: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Header><Text variant="title">Card title</Text></Card.Header>
      <Card.Content><Text variant="body">Card body content.</Text></Card.Content>
      <Card.Footer><Text variant="caption">Footer</Text></Card.Footer>
    </Card>
  ),
};
export const HeaderOnly: Story = {
  render: (args) => (<Card {...args}><Card.Header><Text variant="title">Header</Text></Card.Header></Card>),
};
export const FlushContent: Story = {
  render: (args) => (<Card {...args}><Card.Content flush><Text variant="body">Flush content (no padding)</Text></Card.Content></Card>),
};
export const MediaAndTitle: Story = {
  render: (args) => (
    <Card {...args}>
      <Card.Image source="https://picsum.photos/seed/card/600/600" alt="Card media" />
      <Card.Content>
        <Card.Title>Card title</Card.Title>
        <Text variant="body">Card body content.</Text>
      </Card.Content>
    </Card>
  ),
};
export const WithMedia: Story = {
  render: (args) => (<Card {...args}><Card.Media><Text variant="body">Custom media slot</Text></Card.Media></Card>),
};
export const WithActions: Story = {
  render: (args) => (<Card {...args}><Card.Content><Text variant="body">Body</Text></Card.Content><Card.Actions><Text variant="label">Cancel</Text><Text variant="label">Save</Text></Card.Actions></Card>),
};
