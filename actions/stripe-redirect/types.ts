import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { stripeRedirect } from "./schema";

export type InputType = z.infer<typeof stripeRedirect>;
export type ReturnType = ActionState<InputType, string>;