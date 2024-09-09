import { categoryById } from "@/lib/actions/category";
import UpdateForm from "../components/form_update";

interface Props {
  searchParams: { [key: string]: string };
}

export default async function CategoryUpdatePage({ searchParams }: Props) {
  const category = await categoryById(searchParams.id);
  // console.log(category);

  return (
    <div>
      <UpdateForm category={category} />
    </div>
  );
}
