"use client";
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

import { useTypeStore } from "../lib/zustandStore";
import { useEffect } from "react";

export const ListProperties = () => {
  const properties = useTypeStore()((state: any) => state.properties);
  const delete_property = useTypeStore()((state: any) => state.delete_property);

  const count = useTypeStore()((state: any) => state.count);

  const deleteProp = (idx: number) => {
    const action = alert("Are you sure?");
    delete_property(idx);
  };

  return (
    <>
      {count}
      <div>
        <div className="mt-6">
          <Table>
            <TableCaption>A list of attributes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Properties</TableHead>
                <TableHead>Filterable</TableHead>
                <TableHead>Price variant</TableHead>
                <TableHead>Required</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties &&
                properties.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.attribute_id}
                    </TableCell>
                    <TableCell>{item.filterable ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.price_varient ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.required ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"secondary"}
                        onClick={() => deleteProp(index)}
                      >
                        <CrossCircledIcon></CrossCircledIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
