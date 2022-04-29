
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
near_sdk::setup_alloc!();

#[derive(Debug)]
pub struct Todo {
  id: u8,
  user: String,
  title: String,
  complete: bool,
}

pub struct Todos {
  todos: Vec<Todo>,
}

impl Todos {
  pub fn add_todo(&mut self, title: String) {
    let account_id = env::signer_account_id();
    let user: String = String::from(account_id);
    let len_ = self.todos.len();
    let id___ = len_ as u8;
    let todo = Todo {
      id: id___ ,
      user,
      title,
      complete: false,
    };
    self.todos.push(todo);
  }

  pub fn mark_todo_as_complete_or_incomplete(&mut self, todo_id: u8) {
      let todos = &mut self.todos;

      todos.into_iter().for_each(|item| {
          if item.id == todo_id {
              item.complete = true;
          }
      });
      env::log(b"The todo has been marked as complete");

  }

  pub fn get_todo(&mut self, id: u8) -> Option<&Todo>{
    let me: &Vec<Todo> = &self.todos;
    let  todo =  me.into_iter().find(|tod| tod.id == id);
    return todo;

  }

  pub fn get_user_todos(&mut self, user: String) -> Vec<&Todo> {
    let mut todos_to_return: Vec<&Todo> = Vec::new();
    for n in 0..self.todos.len() {
      let todo_ = self.todos.get(n);
      match todo_ {
        Some(x) => {
          if x.user == user {
            todos_to_return.push(x);
          }
        }
        None => {
          // env::log(b"The todo was not for this user");
        }
      }
    }

    return todos_to_return;
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use near_sdk::MockedBlockchain;
  use near_sdk::test_utils::VMContextBuilder;
  use near_sdk::{testing_env, VMContext};

  // part of writing unit tests is setting up a mock context
  // in this example, this is only needed for env::log in the contract
  // this is also a useful list to peek at when wondering what's available in env::*
  fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
    VMContext {
      current_account_id: "alice.testnet".to_string(),
      signer_account_id: "dalmasonto.testnet".to_string(),
      signer_account_pk: vec![0, 1, 2],
      predecessor_account_id: "jane.testnet".to_string(),
      input,
      block_index: 0,
      block_timestamp: 0,
      account_balance: 0,
      account_locked_balance: 0,
      storage_usage: 0,
      attached_deposit: 0,
      prepaid_gas: 10u64.pow(18),
      random_seed: vec![0, 1, 2],
      is_view,
      output_data_receivers: vec![],
      epoch_height: 19,
    }
  }

  // mark individual unit tests with #[test] for them to be registered and fired
  #[test]
  fn add_todo_test() {
    let _context = get_context(b"add_todo".to_vec(), false);
    testing_env!(_context);
    let mut todos = Todos { todos: Vec::new() };
    let todo_title = "test todo".to_string();
    todos.add_todo(todo_title);
    assert_eq!(todos.todos.len(), 1);
  }

  #[test]
  fn mark_todo_as_complete_test(){
    let _context = get_context(b"mark_todo_as_complete_or_incomplete".to_vec(), false);
    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new()};
    todos.add_todo("Learn How to code in rust".to_string());
    todos.mark_todo_as_complete_or_incomplete(0);
    let get_one_todo = todos.get_todo(0);
    match get_one_todo{
        Some(x_) => {
            assert_eq!(x_.complete, true);
        }
        None => {
          env::log(b"Todo not found");
        }
    }

  }

  #[test]
  fn get_user_todos_test(){
    let _context = get_context(b"get_user_todos".to_vec(), false);
    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new()};

    todos.add_todo("Learn How to code in rust".to_string());
    let user_todos = todos.get_user_todos("dalmasonto.testnet".to_string());
    
    assert_eq!(user_todos.len(), 1);
  }

}
