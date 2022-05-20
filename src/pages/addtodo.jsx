import { useState, useEffect } from 'react'
import Page from '../components/layout/Page'
import PageHeader from '../components/layout/PageHeader'
import PageBody from '../components/layout/PageBody'
import { APP_SEP } from '../app/appConfig'
import { errorHelper } from '../app/nearFunctions'
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material'

import CustomSnackbar from '../components/CustomSnackbar'

const Addtodo = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const [todoTitle, setTodoTitle] = useState('')
  const [loading, setLoading] = useState(false)

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

  const addTodo = () => {
    setLoading(true)
    if (todoTitle.length < 1 || todoTitle === '') {
      openAlert('Please enter a title', 'error')
      setLoading(false)
      return
    }
    else {
      const contract = window.contract
      const todo = {
        id: Date.now(),
        title: todoTitle,
        completed: false
      }
      // dispatch(addtodo(todo))
      if (contract) {
        contract.add_todo({
          title: todoTitle
        }).then(res => {
          console.log(res)
          if (res) {
            // dispatch(addtodo(res))
            setTodoTitle('')
            setLoading(false)
            openAlert(`Todo "${todo.title}" added`, 'success')
          }
        }).catch(err => {
          openAlert(err.message, 'error')
          errorHelper(err)
        })
      }
    }
  }

  const addTodoWithEnter = (e) => {
    if (e.key === 'Enter') {
      addTodo()
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
  }, [])
  return (
    <Page>
      <PageHeader>
        <title>{APP_SEP} Add Todo</title>
      </PageHeader>
      <PageBody>
        <div className="container fullscreen-section">
          <div className="row w-100">
            <div className="col-md-6 offset-md-3">
              {
                loggedIn ? (
                  <div className="custom-card p-2 py-3 px-md-3">
                    <h2 className="text-center mb-3">Add ToDo</h2>
                    <form onSubmit={e => { e.preventDefault(); addTodoWithEnter(e) }}>
                      <div className="form-group">
                        <label htmlFor="todo">Todo</label>
                        <input type="text" className="form-control shadow-none outline-none mt-2" id="todo" placeholder="Enter todo title" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
                      </div>
                      <div className="form-group mt-3">
                        <Button className="btn custom-btn shadow-none outline-none" onClick={addTodo}>
                          <span>SAVE</span>
                          <span>
                            {loading && <CircularProgress />}
                          </span>
                        </Button>
                      </div>
                    </form>
                  </div>
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
      </PageBody>
      <CustomSnackbar alert={alert} />
    </Page>
  )
}

export default Addtodo