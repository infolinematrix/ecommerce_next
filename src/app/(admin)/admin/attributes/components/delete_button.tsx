"use client";

import { Button } from "@/components/ui/button";
import { deleteAttributeById } from "@/lib/actions/attributes";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export const DeleteAttributeButton = ({ id }: any) => {
  return (
    <>
      <form>
        <Button
          variant={"ghost"}
          onClick={(ev: any) => {
            ev.preventDefault();
            deleteAttributeById(id);
          }}
        >
          <CrossCircledIcon></CrossCircledIcon>
        </Button>
      </form>
    </>
  );
};
