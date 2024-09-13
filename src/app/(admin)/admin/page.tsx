import { db } from "@/db";
import { attributes } from "@/db/schema/attributes";
import { getAttributeById } from "@/lib/actions/attributes";
import { eq } from "drizzle-orm";

export default async function Page() {
  const data = await getAttributeById("8d48305b-8dcb-4499-be4e-5e173262638a");
  // console.log(data);

  return (
    <div>
      <div>This is Admin Dashboard</div>
      {data! ? <>{data.name}</> : <>sadasds</>}

      {data?.attribute_values.map((t) => {
        return (
          <>
            <li>{t.attribute_value}</li>
          </>
        );
      })}
    </div>
  );
}
