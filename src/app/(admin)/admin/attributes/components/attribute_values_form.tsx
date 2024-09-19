"use client";

import { useEffect } from "react";
import { useAttriubteStore } from "../lib/store";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AttributeValueType } from "@/db/schema/attributes";
import { Button } from "@/components/ui/button";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { valueSchema } from "../lib/schema";
import { Input } from "@/components/ui/input";

export const AttrubuteValuesForm = () => {
  const values = useAttriubteStore()((state: any) => state.values);
  const delete_value = useAttriubteStore()((state: any) => state.delete_value);
  const valueForm = valueSchema();

  const addValue = (val: string) => {};
  const removeValue = (index: number) => {
    const action = confirm("Are you sure");
    if (action) {
      delete_value(index);
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div>
        <Form {...valueForm}>
          <>
            <div className="flex flex-row gap-4 justify-end">
              <div className="w-[300px] items-end">
                <FormField
                  control={valueForm.control}
                  name="attribute_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter value" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit">
                <Button
                  type="button"
                  onClick={() => {
                    return addValue(valueForm.getValues("attribute_value"));
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </>
        </Form>
      </div>

      {values.length > 0 ? (
        <div className="mt-4">
          <Table>
            <TableBody>
              {values.map((item: string, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"secondary"}
                        size={"sm"}
                        onClick={() => removeValue(index)}
                      >
                        <CrossCircledIcon></CrossCircledIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <>No data found....</>
      )}
    </>
  );
};
