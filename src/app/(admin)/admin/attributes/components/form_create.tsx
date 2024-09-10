"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { any, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { dummyList, slugify } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CameraIcon, HomeIcon, ImageIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AttributeCreateSchema,
  AttributeValueCreateSchema,
} from "../types/attribute_types";
import { attributeInputTypes } from "@/lib/constants";
import api from "@/lib/apiClient";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function CreateAttributeForm() {
  const [showValue, setshowValue] = useState(false);

  const form = useForm<z.infer<typeof AttributeCreateSchema>>({
    resolver: zodResolver(AttributeCreateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      identifier: "",
      custom_name: "",
      input_type: "",
    },
  });

  const valueForm = useForm<z.infer<typeof AttributeValueCreateSchema>>({
    resolver: zodResolver(AttributeValueCreateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      // attribute_id: "",
      attribute_value: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof AttributeCreateSchema>) {
    //-parse zod schema
    const monkeyParse = AttributeCreateSchema.safeParse(formData);
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
    // console.log(data);

    const response = await api.post(`/admin/attributes/create/api`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log("===========", response.data.insertedId);
  }

  const showValueInput = (ev: string) => {
    setValues([]);

    ["TEXTBOX", "TEXTAREA"].includes(ev)
      ? setshowValue(false)
      : setshowValue(true);
  };

  const [values, setValues] = useState<string[]>([]);

  const addValue = () => {
    const val = valueForm.getValues("attribute_value").toString().trim();

    if (!values.includes(val) && val != "") {
      setValues([...values, val]);
      valueForm.reset();
    } else {
      alert("Invalid..");
    }
  };

  const deleteValue = (index: number) => {
    const action = confirm("Are you sure");
    if (action) {
      setValues([...values.slice(0, index), ...values.slice(index + 1)]);
    }
  };

  return (
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
                        placeholder="Enter name"
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input</FormLabel>
                    <FormControl>
                      <Select
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
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>

      <div className="mt-8">
        {showValue == true ? (
          <>
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
                  <Button type="button" onClick={addValue}>
                    Add
                  </Button>
                </div>
              </div>
            </Form>
            <Separator className="my-4" />
          </>
        ) : (
          <></>
        )}

        {values.length > 0 ? (
          <>
            <Table>
              <TableBody>
                {values.map((value: string, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{value}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        variant={"secondary"}
                        onClick={(ev) => deleteValue(index)}
                      >
                        <HomeIcon></HomeIcon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
