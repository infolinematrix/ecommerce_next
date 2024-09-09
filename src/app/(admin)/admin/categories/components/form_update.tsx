"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCategorySchema } from "../types/category_types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import api from "@/lib/apiClient";

export default function UpdateForm({ category }: any) {
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      id: category.id,
      name: category.name,
      identifier: category.identifier,
      short_description: category.short_description,
      active: true,
    },
  });

  const onSubmit = async (formData: z.infer<typeof updateCategorySchema>) => {
    //-parse zod schema
    const monkeyParse = updateCategorySchema.safeParse(formData);
    //--validate zod schema
    if (!monkeyParse.success) {
      console.log("----VALIDATION ERROR");
      return;
    }

    const data = monkeyParse.data;

    // console.log(data);
    const response = await api.put(`/admin/categories/update/api`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data.success) console.log(alert("Successfull"));
  };

  return (
    <div>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} method="PUT">
          <p className="pb-5 text-muted-foreground">
            You are creating under{" "}
            <span className="text-primary font-medium"></span>
          </p>
          <FormItem hidden>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => <Input {...field}></Input>}
            ></FormField>
          </FormItem>

          <div className="flex flex-row gap-4 justify-between">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          onChange={(ev) => {
                            field.onChange(ev);
                            form.setValue(
                              "identifier",
                              slugify(ev.target.value)
                            );
                          }}
                        ></Input>
                      </FormControl>
                    </FormItem>
                  </>
                )}
              ></FormField>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Identifier</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Identifier"
                          {...field}
                          disabled={true}
                        ></Input>
                      </FormControl>
                    </FormItem>
                  </>
                )}
              ></FormField>
            </div>
          </div>

          <div className="pt-4">
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Short description here"
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-4 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="active" className="pl-4">
                    Is Active
                    <span className="pl-1 text-sm font-normal text-muted-foreground">
                      inactive categories are not visible to public
                    </span>
                  </Label>
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="flex flex-row gap-4 pt-8">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
