"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/apiClient";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}
export const DeleteTypeButton = ({ id }: Props) => {
  const route = useRouter();

  const submitHandle = async (formData: FormData) => {
    const action = confirm("Are you sure??");
    if (action === true) {
      const id = formData.get("id")?.toString();
      const response = await api.delete(`/admin/types/delete?id=` + id);
      if (response) {
        console.log("Deleted ....", id);
        route.back();
      }
    }
  };
  return (
    <>
      <form action={submitHandle}>
        <input type="hidden" name="id" defaultValue={id} />
        <Button variant={"secondary"}>
          <CrossCircledIcon></CrossCircledIcon>
        </Button>
      </form>
    </>
  );
};
