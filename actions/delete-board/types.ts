import {z} from "zod";
import {board} from "@prisma/client";
import {ActionState} from "../../src/lib/create-safe-action";
import {DeleteBoard} from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType,board>;