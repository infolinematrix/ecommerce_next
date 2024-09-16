"use client";

import { useForm } from "react-hook-form";
import { TypesSchema } from "../lib/types";
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
import { Button } from "@/components/ui/button";
import { AddAttribute } from "./add_attributes";
import StoreProvider, { useTypes } from "../lib/store";
import { date } from "drizzle-orm/mysql-core";
import { useStore } from "zustand";

export default function CreateForm() {
  const store: any = useTypes();

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
    console.log("sadsfds");
  };

  return (
    <>
      <Form {...typeForm}>
        <form
          noValidate
          name="typF"
          id="typF"
          onSubmit={typeForm.handleSubmit(onTypeSubmit)}
        >
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

      <AddAttribute></AddAttribute>

      <div className="mt-10">
        <Button type="submit" id="typF">
          Save
        </Button>
      </div>
    </>
  );
}
