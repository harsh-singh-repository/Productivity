import {z} from "zod";
import {Card} from "@prisma/client";
import {ActionState} from "../../src/lib/create-safe-action";
import {CopyCard} from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType,Card>;