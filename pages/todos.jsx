import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { APP_SEP } from '../app/appConfig'
import { errorHelper } from '../app/nearFunctions'
import CustomSnackbar from '../components/CustomSnackbar'
import Page from '../components/layout/Page'
import PageBody from '../components/layout/PageBody'
import PageHeader from '../components/layout/PageHeader'
import Todo from '../components/Todo'
import Link from 'next/link'

const Todos = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const openAlert = (message, severity) => {
    setAlert({
      open: true,
      message,
      severity
    })
  }

  const markTodoAsCompleted = (id) => {
    setLoadingUpdate(true)
    markascomplete(id)
  }

  const markascomplete = (id) => {
    const contract = window.contract
    if (contract) {
      contract.mark_todo_as_complete_or_incomplete({
        todo_id: id
      }).then(res => {
        if (res) {
          const newtodos = [...todos]
          const todo = newtodos.find(todo => todo.id === res.id)
          if (todo) {
            todo.complete = res.complete
            setTodos(newtodos)
            openAlert(`Todo "${todo.title}" marked as ${todo.completed ? 'completed' : 'incomplete'}`, 'success')
            setLoadingUpdate(false)
          }
        }
      }).catch(err => errorHelper(err))
    }
  }

  const loadMyTodos = () => {
    const contract = window.contract
    if (contract) {
      contract.get_my_todos().then(todos => {
        if (todos) {
          setTodos(todos)
        }
        setLoading(false)
        setLoadingUpdate(false)
      }).catch(err => {
        errorHelper(err)
      })
    }
    else {
      openAlert('Please reload this page.', 'error')
    }
  }

  const deleteTodo = (id) => {
    setLoadingUpdate(true)
    const contract = window.contract
    if (contract) {
      contract.delete_todo({
        todo_id: id
      }).then(res => {
        // if (res) {
        console.info(res)
        setLoadingUpdate(false)
        loadMyTodos()
        // }
      }).catch(err => errorHelper(err))
    }
  }

  useEffect(() => {
    if (window.walletConnection) {
      const loggedinstatus = window.walletConnection.isSignedIn()
      setLoggedIn(loggedinstatus)
      if (!loggedinstatus) {
        openAlert('Please sign in to continue', 'info')
      }
    }
    setTimeout(() => {
      loadMyTodos()
    }, 2000)
  }, [])
  return (
    <Page>
      <PageHeader>
        <title>{APP_SEP} My Todos</title>
      </PageHeader>
      <PageBody>
        <div className="container fullscreen-section py-5">
          <div className="row w-100">
            <div className="col-md-6 offset-md-3 p-0">
              {
                loggedIn ? (
                  <>
                    <div className="custom-card p-2 py-3 px-md-3">
                      <h2 className="text-center m-0 p-0">ToDos</h2>
                    </div>

                    {
                      loading ? (<>
                        <div className="custom-card p-2 py-3 px-md-3 mt-3">
                          <div className="text-center">
                            <CircularProgress />
                          </div>
                        </div>
                      </>) : (
                        <>
                          <div className="todos mt-3">
                            {
                              todos.length === 0 && (
                                <>
                                  <Alert>
                                    <AlertTitle>No todos found</AlertTitle>
                                    <p>You have not created any todos yet.</p>
                                    <Link href={"/addtodo"}>
                                      <Button>Create new</Button>
                                    </Link>
                                  </Alert>
                                </>
                              )
                            }
                            {
                              loadingUpdate && <div className="custom-card p-2 py-3 px-md-3 my-3">
                                <div className="text-center">
                                  <CircularProgress />
                                </div>
                              </div>
                            }
                            {todos.map(todo => (
                              <Todo key={`rendered_todo__${todo.id}`} todo={todo} markComplete={markTodoAsCompleted} deletetodo={deleteTodo} />
                            ))}
                          </div>
                        </>
                      )
                    }
                  </>
                ) : (
                  <>
                    <Alert severity="info">
                      <AlertTitle>Authentication required</AlertTitle>
                      <p>
                        You must be logged in to view this page.
                      </p>
                    </Alert>
                  </>
                )
              }

            </div>
          </div>
        </div>
      </PageBody >
      <CustomSnackbar alert={alert} />
    </Page >
  )
}

export default Todos