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
import {
  AttributeCreateSchema,
  AttributeUpdateSchema,
  AttributeValueUpdateSchema,
} from "../types/attribute_types";
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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { AttributeContext, useAttributeContext } from "../provider";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import api from "@/lib/apiClient";

interface Props {
  attribute: AttributeType;
  attribute_values: AttributeValueType[];
}

export function FormUpdate({ attribute, attribute_values }: Props) {
  const form = useForm<z.infer<typeof AttributeUpdateSchema>>({
    resolver: zodResolver(AttributeUpdateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: attribute.name,
      identifier: attribute.identifier,
      custom_name: attribute.custom_name ?? attribute.name,
      input_type: attribute.input_type || "TEXTBOX",
    },
  });
  const valueForm = useForm<z.infer<typeof AttributeValueUpdateSchema>>({
    resolver: zodResolver(AttributeValueUpdateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      attribute_value: "",
    },
  });
  const [showValue, setshowValue] = useState(attribute_values.length > 0);
  // const [values, setValues] =
  //   useState<Array<AttributeValueType>>(attribute_values);

  const [values, setValues] = useState<Array<String>>([]);

  useEffect(() => {
    attribute_values.map((r) => {
      // _setValues([..._values, r.attribute_value]);
      // [...values, val]
      addValue(r.attribute_value);
      // console.log(r.attribute_value);
    });
  }, []);
  console.log(values, "============");

  const showValueInput = (ev: string) => {
    ["TEXTBOX", "TEXTAREA"].includes(ev)
      ? setshowValue(false)
      : setshowValue(true);
  };

  const deleteValue = (index: number) => {
    const action = confirm("Are you sure");
    if (action) {
      console.log(values);
      setValues([...values.slice(0, index), ...values.slice(index + 1)]);
    }
  };

  const onSubmit = async (formData: z.infer<typeof AttributeUpdateSchema>) => {
    console.log(form.getValues("input_type"));

    !["TEXTBOX", "TEXTAREA"].includes(form.getValues("input_type")) &&
      setValues([]);

    //-parse zod schema
    const monkeyParse = AttributeUpdateSchema.safeParse(formData);
    //--validate zod schema
    if (!monkeyParse.success) {
      alert("----VALIDATION ERROR");
      return;
    }

    const formdata = monkeyParse.data;
    const data = {
      attribute: formdata,
      attribute_values: values,
    };

    console.log("--------------", data);

    // const response = await api.put(`/admin/attributes/update/api`, data, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });
  };

  const addValue = (val: any) => {
    // const val = valueForm.getValues("attribute_value").toString().trim();
    // console.log(val);

    if (!values.includes(val) && val != "") {
      setValues([...values, val]);
      valueForm.reset();
      console.log("-----------------", values);
    } else {
      alert("Invalid..");
    }
  };

  return (
    <div>
      <AttributeContext.Provider value={{ attribute, attribute_values }}>
        <>
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
                              form.setValue(
                                "identifier",
                                slugify(ev.target.value)
                              );
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
                            // {...field}
                            // onValueChange={(ev) => {
                            //   field.onChange(ev);
                            //   // showValueInput(ev);
                            // }}
                            // onChange={(val) => onChange(val.value)}
                            value={field.value}
                            onValueChange={(ev) => {
                              field.onChange(ev);
                              showValueInput(ev);
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

          {showValue == true ? (
            <div className="flex-1 mt-8">
              <div className="flex justify-end">
                <Form {...valueForm}>
                  <div className="flex flex-row gap-4 justify-end">
                    <div className="w-[300px]">
                      <FormField
                        control={valueForm.control}
                        name="attribute_value"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Enter value" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-fit">
                      <Button
                        type="button"
                        onClick={() => {
                          return addValue(
                            valueForm.getValues("attribute_value")
                          );
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
              <div>
                <>
                  {values.length > 0 ? (
                    <>
                      <Table>
                        <TableBody>
                          {values.map((item: any, index: number) => {
                            return (
                              <TableRow key={index}>
                                <TableCell>{item}</TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    asChild
                                    variant={"outline"}
                                    size={"sm"}
                                    onClick={() => deleteValue(index)}
                                  >
                                    <CrossCircledIcon></CrossCircledIcon>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </>
                  ) : (
                    <>NO DATA</>
                  )}
                </>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </AttributeContext.Provider>
    </div>
  );
}
