import { Checkbox, IconButton } from '@mui/material'
import { FaTrashAlt } from 'react-icons/fa'
const Todo = ({ todo, markComplete, deletetodo }) => {
  const markasComplete = () => {
    markComplete(todo.id)
  }
  const deleteTodo = () => {
    deletetodo(todo.id)
  }
  return (
    <>
      <div className="custom-card p-2 mt-2 todohover">
        <div className="todo">
          <div className="row">
            <div className="col-1" onClick={markasComplete}>
              <div className="checkbox">
                <Checkbox id={`_todo__${todo.id}`} color='success' checked={todo?.complete} />
              </div>
            </div>
            <div className="col-10" onClick={markasComplete}>
              <div className="todo-title w-100 h-100">
                <label className='d-block h-100 w-100 d-flex align-items-center'>
                  <p className='m-0 p-0 h-100 w-100 d-flex align-items-center'>
                    {todo?.title}
                  </p>
                </label>
              </div>
            </div>
            <div className="col-1 p-0">
              <div className="todo-delete d-flex h-100 align-items-center justify-content-center">
                <IconButton className="text-danger" onClick={deleteTodo}>
                  <FaTrashAlt size={16} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo