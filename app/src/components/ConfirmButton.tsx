import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

const ConfirmButton = ({ message, onConfirm, children }: ConfirmProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">{children}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirmation</AlertDialog.Title>
        <AlertDialog.Description size="2">{message}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" type="button">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="blue"
              type="button"
              onClick={() => onConfirm()}
            >
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ConfirmButton;
