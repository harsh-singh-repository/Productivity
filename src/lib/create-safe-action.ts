import {z} from "zod";

export type FieldError<T> = {
   [K in keyof T]?: string[]
}

export type ActionState<TInput,TOutput> = {
    fieldError?: FieldError<TInput>;
    error?: string|null,
    data?:TOutput,
}

export const createSafeAction = <TInput,TOutput>(
    schema: z.Schema<TInput>,
    handler: (validateData:TInput) => Promise<ActionState<TInput,TOutput>>
) => {
    return async(data:TInput):Promise<ActionState<TInput,TOutput>> =>{
        const validationResult = schema.safeParse(data);
        if(!validationResult.success){
              return{
                fieldError : validationResult.error.flatten().fieldErrors as FieldError<TInput>
              }
        }

        return handler(validationResult.data)
    }
}