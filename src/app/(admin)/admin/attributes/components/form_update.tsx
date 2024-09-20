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
import { AttributeType } from "@/db/schema/attributes";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  CrossCircledIcon,
  ReloadIcon,
  UploadIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import api from "@/lib/apiClient";
import { deleteValesByAttributeId } from "@/lib/actions/attributes";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { useRouter } from "next/navigation";
import {
  AttributeUpdateSchema,
  AttributeValueUpdateSchema,
} from "../lib/types";
import { useAttriubteStore } from "../lib/store";
import { CreateAttributeSchema } from "../lib/schema";
import { AttrubuteValuesForm } from "./attribute_values_form";
import { SelectGroup } from "@radix-ui/react-select";

export const UpdateForm = () => {
  const attribute = useAttriubteStore()((state: any) => state.attribute);
  const values = useAttriubteStore()((state: any) => state.values);
  const reset_values = useAttriubteStore()((state: any) => state.reset_values);
  const form = CreateAttributeSchema(attribute);

  const [isLoading, setLoading] = useState(false);

  const [showValue, setshowValue] = useState(values.length > 0);
  const showValueInput = (ev: string) => {
    ["SELECT", "SELECT-MULTIPLE", "OPTIONS"].includes(ev.trim())
      ? setshowValue(true)
      : setshowValue(false);
  };
  const onSubmitAttribute = async (
    formData: z.infer<typeof AttributeUpdateSchema>
  ) => {
    setLoading(true);

    const hasValue = ["TEXTBOX", "TEXTAREA"].includes(formData.input_type)
      ? false
      : true;

    const finalData = {
      id: attribute.id,
      attribute: JSON.stringify(formData),
      values: hasValue ? JSON.stringify(values) : JSON.stringify([]),
    };
    // console.log(finalData);

    const response = await api.put(`/admin/attributes/update/api`, finalData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    setLoading(false);
    console.log(response);
  };

  return (
    <>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmitAttribute)}>
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
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-between mt-4">
            <div className="w-full">
              <div>
                <FormField
                  control={form.control}
                  name="input_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={field.value}
                          onValueChange={(ev) => {
                            field.onChange(ev);
                            showValueInput(ev);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select input" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {attributeInputTypes.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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

          <div className="mt-8">
            {showValue ? (
              <div>
                <div className="my-6 text-sm ">
                  Drizzle provides you the most SQL-like way to fetch data from
                  your database, while remaining type-safe and composable. It
                  natively supports mostly every query feature and capability of
                  every dialect, and whatever it doesn’t support yet, can be
                  added by the user with the powerful sql operator.
                </div>
                <Separator className="my-6" />
                <AttrubuteValuesForm />
              </div>
            ) : (
              <></>
            )}
            <div className="mt-10">
              {isLoading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export function UpdateForm2() {
  // const [showValue, setshowValue] = useState(false);
  // const [values, setValues] = useState(attribute_values);
  // const router = useRouter();
  // const form = useForm<z.infer<typeof AttributeUpdateSchema>>({
  //   resolver: zodResolver(AttributeUpdateSchema),
  //   mode: "onChange",
  //   shouldUnregister: false,
  //   defaultValues: {
  //     name: attribute.name,
  //     identifier: attribute.identifier,
  //     custom_name: attribute.custom_name ?? attribute.name,
  //     input_type: attribute.input_type,
  //   },
  // });
  // const valueForm = useForm<z.infer<typeof AttributeValueUpdateSchema>>({
  //   resolver: zodResolver(AttributeValueUpdateSchema),
  //   mode: "onChange",
  //   shouldUnregister: false,
  //   defaultValues: {
  //     attribute_value: "",
  //   },
  // });
  // const [showValue, setshowValue] = useState(attribute_values.length > 0);
  // const [values, setValues] =
  //   useState<Array<AttributeValueType>>(attribute_values);
  // const [values, setValues] = useState<Array<String>>([]);
  // useEffect(() => {
  //   attribute_values.map((r) => {
  //     // _setValues([..._values, r.attribute_value]);
  //     // [...values, val]
  //     // addValue(r.attribute_value);
  //     // console.log(r.attribute_value);
  //   });
  // }, []);
  // // console.log(values, "============");
  // });
  // const showValueInput = (ev: string) => {
  //   ["TEXTBOX", "TEXTAREA"].includes(ev)
  //     ? setshowValue(false)
  //     : setshowValue(true);
  // };
  // const deleteValue = (index: number) => {
  //   const action = confirm("Are you sure");
  //   if (action) {
  //     setValues([...values.slice(0, index), ...values.slice(index + 1)]);
  //   }
  // };
  // const addValue = () => {
  //   const val = valueForm.getValues("attribute_value").toString().trim();
  //   if (!values.includes(val) && val != "") {
  //     setValues([...values, val]);
  //     valueForm.reset();
  //   } else {
  //     alert("Invalid..");
  //   }
  // };
  // const onSubmit = async (formData: z.infer<typeof AttributeUpdateSchema>) => {
  //   console.log(form.getValues("input_type"));
  //   !["TEXTBOX", "TEXTAREA"].includes(form.getValues("input_type")) &&
  //     setValues([]);
  //   //-parse zod schema
  //   const monkeyParse = AttributeUpdateSchema.safeParse(formData);
  //   //--validate zod schema
  //   if (!monkeyParse.success) {
  //     alert("----VALIDATION ERROR");
  //     return;
  //   }
  //   const formdata = monkeyParse.data;
  //   await deleteValesByAttributeId(attribute.id);
  //   const finalData = {
  //     id: attribute.id,
  //     attribute: formdata,
  //     attribute_values: values,
  //   };
  //   console.log("--------------", finalData);
  //   // const response = await api.put(`/admin/attributes/update/api`, data, {
  //   //   headers: {
  //   //     "Content-Type": "application/x-www-form-urlencoded",
  //   //   },
  //   // });
  // };
  // const addValue = (val: any) => {
  //   // const val = valueForm.getValues("attribute_value").toString().trim();
  //   // console.log(val);
  //   if (!values.includes(val) && val != "") {
  //     setValues([...values, val]);
  //     valueForm.reset();
  //     console.log("-----------------", values);
  //   } else {
  //     alert("Invalid..");
  //   const response = await api.put(`/admin/attributes/update/api`, finalData, {
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   });
  //   if (response.status == 200) {
  //     console.log("Response: ", values);
  //     // toast({
  //     //   title: "Scheduled: Catch up ",
  //     //   description: "Friday, February 10, 2023 at 5:57 PM",
  //     //   action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
  //     // });
  //     router.back();
  //   }
  // };
  // useEffect(() => {
  //   const typ = form.getValues("input_type").trim();
  //   ["TEXTBOX", "TEXTAREA"].includes(typ)
  //     ? setshowValue(false)
  //     : setshowValue(true);
  // }, []);
  // const valueForm = useForm<z.infer<typeof AttributeValueUpdateSchema>>({
  //   resolver: zodResolver(AttributeValueUpdateSchema),
  //   mode: "onChange",
  //   shouldUnregister: false,
  //   defaultValues: {
  //     attribute_value: "",
  //   },
  // });
  return {
    /*
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
      {/*
      {showValue == true ? (
        <div className="flex-1 mt-8 justify-end">
          <Separator className="my-4" />
          <div className="flex flex-row gap-4">
            <Alert className="border-0">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Attribute values</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <div>
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
            </div>
          </div>
          <div>
            <>
              {values.length > 0 ? (
                <>
                  <Table>
                    <TableBody>
                      {values.map((item: string, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item}</TableCell>
                            <TableCell className="text-right">
                              <Button
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
      
    </div> */
  };
}
