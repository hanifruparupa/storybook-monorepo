import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Text } from "../Text/Text";

const meta = {
  title: "Web/Card",
  component: Card,
  args: {
    children: "Card content goes here",
    variant: "outlined",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["plain", "outlined", "elevated"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
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
      <Card.Image
        source="https://picsum.photos/seed/card-media/600/600"
        alt="Card media"
        aspectRatio={1}
      />
      <Card.Content>
        <Card.Title>Media and title</Card.Title>
        <Text variant="body">Body text under the title.</Text>
      </Card.Content>
    </Card>
  ),
};
