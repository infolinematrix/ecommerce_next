"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttributeCreateSchema } from "../lib/types";
import { attributeInputTypes } from "@/lib/constants";
import api from "@/lib/apiClient";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useAttriubteStore } from "../lib/store";
import { AttrubuteValuesForm } from "./attribute_values_form";
import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";

export default function CreateAttributeForm() {
  const [showValue, setshowValue] = useState(false);
  const router = useRouter();
  const values = useAttriubteStore()((state: any) => state.values || []);
  const [isLoading, setLoading] = useState(false);
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
      attribute: JSON.stringify(formdata),
      values: JSON.stringify(values),
    };

    setLoading(true);

    const response = await api.post(`/admin/attributes/create/api`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log("===========", response.data.insertedId);

    router.back();
  }

  const showValueInput = (ev: string) => {
    ["SELECT", "SELECT-MULTIPLE", "OPTIONS"].includes(ev.trim())
      ? setshowValue(true)
      : setshowValue(false);
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
                        {...field}
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

          <div className="mt-8">
            {showValue == true ? (
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
          </div>

          <div className="mt-10">
            {isLoading ? (
              <Button disabled>
                <UploadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                Save
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
