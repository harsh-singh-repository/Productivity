import {z} from "zod";
import {Card} from "@prisma/client";
import {ActionState} from "../../src/lib/create-safe-action";
import {DeleteCard} from "./schema";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType,Card>;