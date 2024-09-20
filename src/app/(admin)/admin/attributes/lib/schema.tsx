import { useForm } from "react-hook-form";
import { AttributeUpdateSchema, AttributeValueUpdateSchema } from "./types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttributeType } from "@/db/schema/attributes";

export const CreateAttributeSchema = (attribute: AttributeType) => {
  return useForm<z.infer<typeof AttributeUpdateSchema>>({
    resolver: zodResolver(AttributeUpdateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: attribute.name,
      identifier: attribute.identifier,
      custom_name: attribute.custom_name ?? attribute.name,
      input_type: attribute.input_type,
    },
  });
};

export const ValueSchema = () =>
  useForm<z.infer<typeof AttributeValueUpdateSchema>>({
    resolver: zodResolver(AttributeValueUpdateSchema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      attribute_value: "",
    },
  });
