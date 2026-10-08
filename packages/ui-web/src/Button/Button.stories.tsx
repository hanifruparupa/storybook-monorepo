import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Web/Button",
  component: Button,
  args: {
    label: "Button",
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  // A bounded container gives `fullWidth` a definite width to fill; the default
  // `centered` layout is shrink-to-fit, which hides the effect.
  decorators: [
    (Story) => (
      <div
        style={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "reset"
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

/**
 * Responsive size — resize the browser to see the size change.
 */
export const Responsive: Story = {
  args: {
    size: { xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" },
  },
};

/** Interaction: clicking fires onPress. */
export const ClickCallsOnPress: Story = {
  args: { label: "Click me", onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

/** Interaction: a disabled button does not fire onPress. */
export const DisabledDoesNotFire: Story = {
  args: { label: "Disabled", disabled: true, onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

/** Interaction: the button is keyboard-operable (Enter). */
export const KeyboardActivates: Story = {
  args: { label: "Keyboard", onPress: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    button.focus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onPress).toHaveBeenCalled();
  },
};

const leftArrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 3 5 8l5 5" />
  </svg>
);

const rightArrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3l5 5-5 5" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    label: "Back",
    leftIcon: leftArrowIcon,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Next",
    rightIcon: rightArrowIcon,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "More",
    leftIcon: leftArrowIcon,
    rightIcon: rightArrowIcon,
  },
};
