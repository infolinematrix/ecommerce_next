import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { deleteAttributeById } from "@/lib/actions/attributes";
import { categoryDeleteById } from "@/lib/actions/category";
import api from "@/lib/apiClient";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export const DeleteCategoryeButton = ({ id }: any) => {
  const router = useRouter();

  const deleteCategory = async (formData: FormData) => {
    const cid = formData.get("id");

    const action = confirm("Are you sure?");

    if (action) {
      const response = await api.delete("/admin/categories/delete?id=" + cid, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status == 200) {
        router.refresh();
        router.back();
      }
    }
  };

  return (
    <>
      <form action={deleteCategory}>
        <input type="hidden" name="id" defaultValue={id} />
        <Button
          //   type="button"
          variant={"ghost"}
          //   onSubmit={(ev) => {
          //     ev.preventDefault();
          //     deleteCategory;
          //   }}
          //   onSubmit={(ev: any) => {
          //     ev.preventDefault();
          //     const action = confirm("Are you sure?");
          //     if (action) {
          //       deleteCategory(ev);
          //     }
          //   }}
        >
          <CrossCircledIcon></CrossCircledIcon>
        </Button>
      </form>
    </>
  );
};
