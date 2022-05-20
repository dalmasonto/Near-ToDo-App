const APP_NAME = 'Near ToDo App';
const SEPARATOR = ' | ';
const APP_SEP = APP_NAME + SEPARATOR;
const CONTRACT_NAME = "dalmasonto.testnet"
const CONTRACT_VIEW_METHODS = []
const CONTRACT_CHANGE_METHODS = ["get_my_todos", "add_todo", "delete_todo", "mark_todo_as_complete_or_incomplete", "get_help"]

export {
  APP_NAME,
  SEPARATOR,
  APP_SEP,
  CONTRACT_NAME,
  CONTRACT_VIEW_METHODS,
  CONTRACT_CHANGE_METHODS
}