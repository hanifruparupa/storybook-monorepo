import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, screen, userEvent } from "storybook/test";
import { Button } from "../Button/Button";
import { Modal, type NativeModalProps } from "./Modal";

function ModalDemo(props: Omit<NativeModalProps, "visible">) {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Button label="Open modal" onPress={() => setOpen(true)} />
      <Modal
        {...props}
        visible={open}
        onRequestClose={() => {
          props.onRequestClose?.();
          setOpen(false);
        }}
      />
    </>
  );
}

const meta = {
  title: "Native/Modal",
  component: Modal,
  args: {
    visible: true,
    title: "Delete item",
    children: "This action cannot be undone.",
    onRequestClose: fn(),
  },
  parameters: {
    // react-native-web's Modal always renders `aria-modal="true"` but only sets
    // `role="dialog"` once its internal animation reports "active"; axe flags that
    // unsupported combination. Scoped to this component only (RN on-device is fine).
    a11y: { config: { rules: [{ id: "aria-allowed-attr", enabled: false }] } },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const BottomSheet: Story = {
  args: { placement: "bottom-sheet" },
};

export const NonDismissible: Story = {
  args: { dismissOnBackdropPress: false },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
};

export const OpensAndCloses: Story = {
  args: { title: "Delete item", onRequestClose: fn() },
  render: (args) => <ModalDemo {...args} />,
  play: async ({ args }) => {
    await expect(await screen.findByTestId("modal-content")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("modal-backdrop"));
    await expect(args.onRequestClose).toHaveBeenCalled();
  },
};

export const NonDismissibleStaysOpen: Story = {
  args: { title: "Delete item", dismissOnBackdropPress: false, onRequestClose: fn() },
  render: (args) => <ModalDemo {...args} />,
  play: async ({ args }) => {
    await screen.findByTestId("modal-content");
    await userEvent.click(screen.getByTestId("modal-backdrop"));
    await expect(args.onRequestClose).not.toHaveBeenCalled();
    await expect(screen.getByTestId("modal-content")).toBeInTheDocument();
  },
};
