import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import store from "../lib/store";

interface Props {
  properties: any;
}

export const ListProperties = async ({ properties }: Props) => {
  return (
    <>
      <div>
        <div className="mt-6">
          <Table>
            <TableCaption>A list of attributes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Attribute</TableHead>
                <TableHead>Filterable</TableHead>
                <TableHead>Price variant</TableHead>
                <TableHead>Required</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {store.type_attributes &&
                store.type_attributes.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.attribute_name}
                    </TableCell>
                    <TableCell>{item.filterable ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.price_varient ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.required ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"secondary"}
                        onClick={(ev) => attribute_delete(index)}
                      >
                        <CrossCircledIcon></CrossCircledIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
