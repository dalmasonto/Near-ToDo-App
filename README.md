# NEAR ToDo App

Project structure for writing smart contracts in Rust for NEAR Protocol

## Required Software

- Rust + cargo          
- Node.js
- NEAR CLI 3.1 

## How to use from the command line
- Confirm that you have `rust`, `cargo`, `node & npm` and `Near CLI`

- Run `cargo test` if you are on local environent.

- If logged in to your Near account via command line

To add a new Todo `near call dalmasonto.testnet add_todo '{"title": "some todo value"}' --accountId youraccount.testnet`

To get your todos `near call dalmasonto.testnet get_my_todos --accountId youraccount.testnet`

To mark a Todo as complete `near call dalmasonto.testnet mark_todo_as_complete_or_incomplete '{"todo_id": <id> }' --accountId youraccount.testnet`

### Main methods

`add_todo`
`get_my_todos`
`mark_todo_as_complete_or_incomplete`

## Authors

- Dalmas Ogembo <dalmasogembo@gmail.com> [@dalmasonto](https://twitter.com/dalmasonto)
