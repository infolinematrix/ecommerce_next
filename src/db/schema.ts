import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
// import { demo } from "./schemas/demo";
// import { todos } from "./schemas/todo";
import { categories } from "./schemas/categories";
import {
  attributes,
  attribute_values,
  attributesRelations,
  attributeValuesRelations,
} from "./schema/attributes";

import { types, type_properties } from "./schema/types";

export const schema = {
  // todos,
  // demo,
  categories,
  attributes,
  attribute_values,
  attributesRelations,
  attributeValuesRelations,
  types,
  type_properties,
};
