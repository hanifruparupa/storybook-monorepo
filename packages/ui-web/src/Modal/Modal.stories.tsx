import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, screen, userEvent } from "storybook/test";
import { Button } from "../Button/Button";
import { Modal, type WebModalProps } from "./Modal";

function ModalDemo(props: Omit<WebModalProps, "visible">) {
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
  title: "Web/Modal",
  component: Modal,
  args: {
    visible: true,
    title: "Delete item",
    children: "This action cannot be undone.",
    onRequestClose: fn(),
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
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await expect(args.onRequestClose).toHaveBeenCalled();
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const BackdropCloses: Story = {
  args: { title: "Delete item", onRequestClose: fn() },
  render: (args) => <ModalDemo {...args} />,
  play: async ({ args }) => {
    await screen.findByRole("dialog");
    await userEvent.click(screen.getByTestId("modal-backdrop"));
    await expect(args.onRequestClose).toHaveBeenCalled();
  },
};
