import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell, Table } from "@/components/ui/table";
import { AttributeValueType } from "@/db/schema/attributes";
import { deleteValue } from "@/lib/actions/attributes";
import { CrossCircledIcon, HomeIcon } from "@radix-ui/react-icons";
import { useAttributeContext } from "../provider";

export const ValuesDataTable = () => {
  const useAttribute = useAttributeContext();
  // const { attribute_values } = useAttributeContext();
  // const values = useAttribute.attribute_values;
  // console.log(values);
  // console.log(useAttribute.attribute_values);
  const submitDelete = (index: number) => {
    const action = confirm("Are you sure");
    // var tv = values;
    if (action) {
      useAttribute.attribute_values = [
        ...useAttribute.attribute_values.slice(0, index),
        ...useAttribute.attribute_values.slice(index + 1),
      ];
      console.log(useAttribute.attribute_values);
      // useAttribute.attreibute_values = tv;
    }
  };

  return (
    <>
      {useAttribute.attribute_values.length > 0 ? (
        <>
          <Table>
            <TableBody>
              {useAttribute.attribute_values.map(
                (item: AttributeValueType, index: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.attribute_value}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => submitDelete(index)}
                        >
                          <CrossCircledIcon></CrossCircledIcon>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <>NO DATA</>
      )}
    </>
  );
};
