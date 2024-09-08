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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
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
import { CameraIcon, ImageIcon } from "@radix-ui/react-icons";
import api, { fetcher } from "@/lib/apiClient";
import { createCategorySchema } from "../types/category_types";

export default function CreateForm(props: { parentId: string | undefined }) {
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      parent_id: props.parentId,
      name: "",
      identifier: "",
      short_description: "",
      has_child: "true",
      active: true,
    },
  });

  const onSubmit = async (formData: z.infer<typeof createCategorySchema>) => {
    //-parse zod schema
    const monkeyParse = createCategorySchema.safeParse(formData);
    //--validate zod schema
    if (!monkeyParse.success) {
      console.log("----VALIDATION ERROR");
      return;
    }

    const data = monkeyParse.data;

    console.log(data);

    const response = await api.post(`/admin/categories/create/api`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // console.log("...response", response);
  };

  return (
    <>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <p className="pb-5 text-muted-foreground">
            You are creating under{" "}
            <span className="text-primary font-medium"></span>
          </p>

          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
                        onChange={(ev) => {
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
              name="has_child"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <div className="flex flex-row gap-4 mt-3">
                    <div className="flex-1 items-center space-x-2">
                      <Card className="p-4 h-[100px]">
                        <RadioGroupItem
                          {...field}
                          value="true"
                          onChange={field.onChange}
                        />
                        <Label htmlFor="r1" className="pl-4">
                          Allow create Child
                        </Label>
                        <p className="text-sm  text-muted-foreground">
                          Allow to create child categories under this, can't add
                          products under this category.
                        </p>
                      </Card>
                    </div>

                    <div className="flex-1 items-center">
                      <Card className="p-4  h-[100px]">
                        <RadioGroupItem
                          {...field}
                          value="false"
                          onChange={field.onChange}
                        />
                        <Label htmlFor="r2" className="pl-4">
                          Allow create Products
                        </Label>
                        <p className="text-sm  text-muted-foreground">
                          Allow adding products under this category, you can't
                          create child.
                        </p>
                      </Card>
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div className="pt-8">
            {/* <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-4 space-y-0">
                  <FormControl>
                    <Checkbox {...field} />
                  </FormControl>
                  <label
                    htmlFor="active"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is Active?{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      inactive categories are not visible to public
                    </span>
                  </label>
                </FormItem>
              )}
            /> */}
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

          <div className="pt-8">
            {/* <div className="flex flex-row gap-4 justfy-between   h-[200px]">
              <div className="w-[200px] bg-slate-100 rounded">
                <div className="flex items-center">CENER</div>
              </div>
              <div className="w-full bg-slate-100 items-center rounded">
                ads
              </div>
            </div> */}

            <div className="flex flex-row  gap-3">
              <div className="bg-slate-100 w-[200px] h-[200px] relative flex  rounded-lg border">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
                  <ImageIcon width={30} height={30} />
                </div>
              </div>
              <div className="bg-slate-100 w-full h-[200px] relative flex rounded-lg border">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4">
                  <ImageIcon width={40} height={40} color="grey" />
                </div>
              </div>
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
    </>
  );
}
