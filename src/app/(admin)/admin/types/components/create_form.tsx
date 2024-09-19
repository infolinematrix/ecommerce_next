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
import api from "@/lib/apiClient";
import { useTypeStore } from "../lib/zustandStore";

export default function CreateForm() {
  const properties = useTypeStore()((state: any) => state.properties);
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
    const monkeyParse = TypesSchema.safeParse(typeFormData);
    const data = monkeyParse.data;

    const postData = new FormData();
    postData.append("type", JSON.stringify(data));
    postData.append("properties", JSON.stringify(properties));

    const response = await api.post(`/admin/types/create/api`, postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response && response.status == 200) {
      alert("Saved.....");
    }
  };

  return (
    <>
      <Form {...typeForm}>
        <form
          noValidate
          onSubmit={typeForm.handleSubmit(onTypeSubmit)}
          id="typForm"
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
        <Button form="typForm">Save Type</Button>
      </div>
    </>
  );
}
