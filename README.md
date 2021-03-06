# Near Todo App
The near todo app is a sample project using Near Protocol. Its a simple project that allows users to add new todos, update todo status, delete todos and get all their todos.

## Required Software
- Rust + cargo
- Node + npm
- NEAR CLI 3.1

## Chart of functions
 - This chart shows the functions and what they do.
```mermaid
graph TB
A(Todos) ---> B(add_todo) --> C(Add a new todo) --> D(Returns the newly added todo)
A(Todos) ---> E(delete_todo) --> F(Delete a todo) --> G(Logs a message whether it was successful or not)
A(Todos) ---> H(mark_todo_as_complete_or_incomplete) --> I(To update the status of a todo) --> J(Returns an option of the todo)
A(Todos) ---> K(get_my_todos) --> L(To get your todos) --> M(Returns a list of your todos)
A(Todos) ---> N(get_help) --> O(To get help) --> P(Returns instructions)
```
## Quick near calls from the terminal
> **Remember you should be logged in to near from your terminal before you make the calls.**
 1. **To add a new todo** -  `near call dalmasonto.testnet add_todo '{"title": "some todo value"}' --accountId youraccount.testnet`
 2.  **To get all your todos** - `near call dalmasonto.testnet get_my_todos --accountId youraccount.testnet`
 3.  **To mark todo as complete or incomplete** - `near call dalmasonto.testnet mark_todo_as_complete_or_incomplete '{"todo_id": <id> }' --accountId youraccount.testnet`
 4.  **To delete a todo** - `near call dalmasonto.testnet delete_todo '{"todo_id": <id> }' --accountId youraccount.testnet`
 5.  **To get help** - `near call dalmasonto.testnet get_help --accountId youraccount.testnet`

> **Pro Tip** - Replace `youraccount.testnet` with your ***Testnet account***

> **Don't forget** - `<id>` Should be replaced with the right id of a todo you get after adding a new todo.

## Author
Dalmas Ogembo <dalmasogembo@gmail.com> [@dalmasonto](https://twitter.com/dalmasonto)
Visit site [Live Software Developer](https://livesoftwaredeveloper.com)
