"use client";

import { useForm } from "react-hook-form";
import { TypePropertiesSchema, TypesSchema } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { attributeInputTypes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AddAttribute } from "./add_attributes";
import { AttributeType } from "@/db/schema/attributes";

export default function CreateForm({ data }: any) {
  const typeForm = useForm<z.infer<typeof TypesSchema>>({
    resolver: zodResolver(TypesSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      identifier: "",
    },
  });

  const onTypeSubmit = async (typeFormData: z.infer<typeof TypesSchema>) => {
    console.log(typeFormData.name);
  };

  return (
    <div>
      <Form {...typeForm}>
        <form noValidate onSubmit={typeForm.handleSubmit(onTypeSubmit)}>
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-full">
              <FormField
                control={typeForm.control}
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
                          typeForm.setValue(
                            "identifier",
                            slugify(ev.target.value)
                          );
                        }}
                      />
                    </FormControl>

                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={typeForm.control}
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

                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      {/* <Form {...typePropertiesform}>
        <form
          noValidate
          onSubmit={typeForm.handleSubmit(onTypePropertiesSubmit)}
        >
          <div className="flex flex-row gap-4 justify-stretch mt-8">
            <div className="w-1/2">
              <FormField
                control={typePropertiesform.control}
                name="attribute_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attribute</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(ev) => {
                          // field.onChange(ev);
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
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div>
              <FormField
                control={typePropertiesform.control}
                name="filterable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filterable</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Filterable</SelectLabel>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div>
              <FormField
                control={typePropertiesform.control}
                name="price_varient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price variant</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Filterable</SelectLabel>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div>
              <FormField
                control={typePropertiesform.control}
                name="required"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Filterable</SelectLabel>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div>
              <FormItem>
                <FormLabel>...</FormLabel>
                <FormControl>
                  <Button variant={"secondary"}>Add</Button>
                </FormControl>
              </FormItem>
            </div>
          </div>
        </form>
      </Form> */}

      <AddAttribute data={data}></AddAttribute>

      <div className="mt-10">
        <Button>Save Type</Button>
      </div>
    </div>
  );
}
