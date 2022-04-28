
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};
near_sdk::setup_alloc!();


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
  pub fn addTodo(&mut self, title: String) {
    let account_id = env::signer_account_id();
    let user: String = String::from(account_id);
    let len_ = self.todos.len();
    let id___ = len_ as u8; //i8::from(len_);
    let todo = Todo {
      id: id___ ,
      user: user,
      title: title,
      complete: false,
    };
    self.todos.push(todo);
  }

  pub fn markTodoAsCompleteorIncomplete(&mut self, todo_id: u8) {
      let mut todo__ = self.getTodo(todo_id);
      match todo__{
          Some(x) => {
              if x.complete == true{
                  x.complete = false
              }
              else{
                  x.complete = true;
              }
          }
        None => todo!(),
      }
      env::log(b"guess is too low ");

  }

  fn getTodo(&mut self, id: u8) -> Option<&mut Todo> {
    let todo_with_id = self.todos.iter_mut().filter(|x| x.id == id).next();
    return todo_with_id;
  }

  pub fn getUserTodos(&mut self, user: String) -> Vec<&Todo> {
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
          env::log(b"guess is too low ");
        }
      }
    }

    return todos_to_return;
  }
}

mod tests {
  use super::*;
  use near_sdk::MockedBlockchain;
  use near_sdk::{testing_env, VMContext};

  // part of writing unit tests is setting up a mock context
  // in this example, this is only needed for env::log in the contract
  // this is also a useful list to peek at when wondering what's available in env::*
  fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
    VMContext {
      current_account_id: "alice.testnet".to_string(),
      signer_account_id: "robert.testnet".to_string(),
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


}
