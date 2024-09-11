import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell, Table } from "@/components/ui/table";
import { AttributeValueType } from "@/db/schema/attributes";
import { deleteValue } from "@/lib/actions/attributes";
import { CrossCircledIcon, HomeIcon } from "@radix-ui/react-icons";

interface Props {
  values: AttributeValueType[];
}
export const ValuesDataTable = ({ values }: Props) => {
  return (
    <>
      {values.length > 0 ? (
        <>
          <Table>
            <TableBody>
              {values.map((item: AttributeValueType) => {
                return (
                  <>
                    <TableRow key={item.id}>
                      <TableCell>{item.attribute_value}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant={"outline"} size={"sm"}>
                          <CrossCircledIcon></CrossCircledIcon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
