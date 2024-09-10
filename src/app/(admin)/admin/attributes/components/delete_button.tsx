"use client";

import { Button } from "@/components/ui/button";
import { deleteAttributeById } from "@/lib/actions/attributes";
import { HomeIcon } from "@radix-ui/react-icons";

const deleteAttr = () => {
  console.log("+++++++++++++DE");
  //   deleteAttributeById();
};

export const DeleteAttributeButton = ({ id }: any) => {
  console.log("+++++++++++++DE", id);
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
          <HomeIcon></HomeIcon>
        </Button>
      </form>
    </>
  );
};
