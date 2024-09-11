"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AttributeCreateSchema } from "../types/attribute_types";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { attributeInputTypes } from "@/lib/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AttributeType, AttributeValueType } from "@/db/schema/attributes";
import { Table } from "@/components/ui/table";
import { ValuesDataTable } from "./values_data_table";
import { useEffect, useState } from "react";
import { and } from "drizzle-orm";

interface Props {
  attribute: AttributeType;
  attribute_values: AttributeValueType[];
}

export function FormUpdate({ attribute, attribute_values }: Props) {
  const form = useForm<z.infer<typeof AttributeCreateSchema>>({
    resolver: zodResolver(AttributeCreateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: attribute.name || "",
      identifier: attribute.identifier || "",
      custom_name: attribute.custom_name || "",
      input_type: attribute.input_type || "TEXTBOX",
    },
  });

  const [values, setValues] =
    useState<Array<AttributeValueType>>(attribute_values);

  const onSubmit = async () => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name"
                        {...field}
                        onChange={(ev: any) => {
                          field.onChange(ev);
                          form.setValue("identifier", slugify(ev.target.value));
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Identifier"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-between ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="input_type"
                // defaultValue={form.get}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(ev) => {
                          field.onChange(ev);
                          // showValueInput(ev);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select input" />
                        </SelectTrigger>
                        <SelectContent>
                          {attributeInputTypes.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription></FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="custom_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom name</FormLabel>
                    <FormControl>
                      <Input placeholder="Custom Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 pt-8">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>

      <div className="flex-1 mt-8">
        <div className="flex justify-end">values</div>
        <div>
          <ValuesDataTable values={values} />
        </div>
      </div>
    </div>
  );
}
