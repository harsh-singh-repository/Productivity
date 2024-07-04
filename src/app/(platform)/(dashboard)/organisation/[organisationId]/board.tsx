import { DeleteBoard } from "../../../../../../actions/deleteDashboard"
import DeleteBtn from "./DeleteBtn"

interface BoardProps{
    title: string,
    id: string
}


export const Board = ({title,id}:BoardProps) => {

    const deleteBoardwithId = DeleteBoard.bind(null,id)
  return (
    <>
       <form action={deleteBoardwithId} className="flex items-center gap-x-2">
          <p>
            Board Title: {title}
          </p>
          <DeleteBtn/>
       </form>
    </>
  )
}