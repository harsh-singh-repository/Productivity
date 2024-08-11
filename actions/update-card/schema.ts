import {z} from "zod";

export const UpdateCard = z.object({
    boardId:z.string(),
    description:z.optional(
        z.string({
           required_error:"Description is Required",
           invalid_type_error:"Description is Required"
        }).min(3,{
            message:"Description is too short"
        })
    ),
    title:z.optional(z.string({
        required_error:"Is Required",
        invalid_type_error:"Title is Required",
    }).min(3,{
        message:"Title is too short"
    })),
    id:z.string(),
})