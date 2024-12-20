"use client";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { attributeInputTypes } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { TypePropertiesSchema } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { CrossCircledIcon } from "@radix-ui/react-icons";
import { dummyList } from "@/lib/utils";
import { z } from "zod";
import { useTypes } from "../lib/store";
import { useTypeStore } from "../lib/zustandStore";
import { ListProperties } from "./list_properties";

export const AddAttribute = () => {
  const attributes = useTypeStore()((state: any) => state.attributes);
  const properties = useTypeStore()((state: any) => state.properties);

  const typePropertiesform = useForm<z.infer<typeof TypePropertiesSchema>>({
    resolver: zodResolver(TypePropertiesSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      attribute_id: "",
      attribute_name: "",
      filterable: false,
      price_varient: false,
      required: false,
    },
  });
  const onTypePropertiesSubmit = async (
    propertiesFormData: z.infer<typeof TypePropertiesSchema>
  ) => {
    //-parse zod schema
    const monkeyParse = TypePropertiesSchema.safeParse(propertiesFormData);
    //--validate zod schema
    if (!monkeyParse.success) {
      console.log("----VALIDATION ERROR");
      return;
    }

    const formdata = monkeyParse.data;

    // add name to render table data;
    attributes.find((i: any) => {
      if (i.id === formdata.attribute_id) {
        formdata.attribute_name = i.name;
      }
    });

    if (
      !properties.find((o: any) => o.attribute_id === formdata.attribute_id)
    ) {
      properties.push(formdata);
    }

    console.log("Added..............", formdata);

    // typePropertiesform.reset();
  };

  return (
    <>
      <Form {...typePropertiesform}>
        <form
          noValidate
          onSubmit={typePropertiesform.handleSubmit(onTypePropertiesSubmit)}
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
                          field.onChange(ev);
                          // showValueInput(ev);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select input" />
                        </SelectTrigger>
                        <SelectContent>
                          {attributes.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
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
                      <Select
                        onValueChange={(ev) => {
                          field.onChange(
                            ev.toLowerCase() === "true" ? true : false
                          );
                        }}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Filterable</SelectLabel>
                            <SelectItem value="false">No</SelectItem>
                            <SelectItem value="true">Yes</SelectItem>
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
                      <Select
                        onValueChange={(ev) => {
                          field.onChange(
                            ev.toLowerCase() === "true" ? true : false
                          );
                        }}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Price variant</SelectLabel>
                            <SelectItem value="false">No</SelectItem>
                            <SelectItem value="true">Yes</SelectItem>
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
                      <Select
                        onValueChange={(ev) => {
                          field.onChange(
                            ev.toLowerCase() === "true" ? true : false
                          );
                        }}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Required</SelectLabel>
                            <SelectItem value="false">No</SelectItem>
                            <SelectItem value="true">Yes</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="text-right">
              <FormItem>
                <FormLabel>...</FormLabel>
                <FormControl>
                  <Button variant={"secondary"} type="submit">
                    Add
                  </Button>
                </FormControl>
              </FormItem>
            </div>
          </div>
        </form>
      </Form>

      {/* properties */}
      <ListProperties />
    </>
  );
};
