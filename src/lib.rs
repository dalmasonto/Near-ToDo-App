use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Serialize;
use near_sdk::{env, near_bindgen};
// near_sdk::setup_alloc!();

// #[near_bindgen]
#[derive(Serialize, BorshDeserialize, BorshSerialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Todo {
  id: u8,
  user: String,
  title: String,
  complete: bool,
}

#[derive(Serialize, BorshDeserialize, BorshSerialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Instruction {
  title: String,
  description: String,
  command: String,
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Todos {
  todos: Vec<Todo>,
}

#[near_bindgen]
impl Todos {
  pub fn add_todo(&mut self, title: String) -> Todo {
    let account_id = env::signer_account_id();
    let user = String::from(account_id);
    let len_ = self.todos.len();
    let mut todo_id = 0;
    if len_ > 0 {
      todo_id = self.todos[len_ - 1].id + 1;
    }
    let todo = Todo {
      id: todo_id as u8,
      user,
      title,
      complete: false,
    };
    self.todos.push(todo.clone());
    return todo.clone();
  }

  pub fn mark_todo_as_complete_or_incomplete(&mut self, todo_id: u8) -> Option<&Todo> {
    let todos = &mut self.todos;

    let account_id = env::signer_account_id();
    let user: String = String::from(account_id);

    todos.into_iter().for_each(|item| {
      if item.id == todo_id && item.user == user {
        if item.user == user {
          if item.complete {
            item.complete = false;
            env::log_str("The todo has been marked as incomplete");
          } else {
            item.complete = true;
            env::log_str("The todo has been marked as complete");
          }
        } else {
          env::log_str("This is not your todo, You can't update its status");
        }
      }
    });
    return self.get_todo(todo_id);
  }

  pub fn get_todo(&mut self, todo_id: u8) -> Option<&Todo> {
    let me: &Vec<Todo> = &self.todos;
    let todo = me.into_iter().find(|tod| tod.id == todo_id);
    return todo;
  }

  pub fn delete_todo(&mut self, todo_id: u8) {
    let todos = &mut self.todos.clone();
    let account_id = env::signer_account_id();
    let user = String::from(account_id);
    todos.into_iter().for_each(|item| {
      if item.id == todo_id {
        if item.user == user {
          env::log_str("The todo has been deleted");
          // self.todos.retain(|todo| todo.id != todo_id);
          // let new_todos = other_todos.retain(|todo| todo.id != todo_id);
          self.todos.retain(|todo| todo.id != todo_id);
        } else {
          env::log_str("This is not your todo, You can't delete it");
        }
      }
    });
  }

  pub fn get_my_todos(&mut self) -> Vec<&Todo> {
    let account_id = env::signer_account_id();
    let user: String = String::from(account_id);
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

  pub fn get_help(&mut self) -> Vec<Instruction> {
    let mut instructions = Vec::new();
    instructions.push(Instruction {
      title: String::from("Add a todo"),
      description: String::from("Use the following command to add a todo:"),
      command: String::from("add_todo '{\"title\": \"<title>\"}'"),
    });
    instructions.push(Instruction {
      title: String::from("Get your todos"),
      description: String::from("Use the following command to get your todos:"),
      command: String::from("get_my_todos"),
    });
    instructions.push(Instruction {
      title: String::from("Mark a todo as complete or incomplete"),
      description: String::from(
        "Use the following command to mark a todo as complete or incomplete:",
      ),
      command: String::from("mark_todo_as_complete_or_incomplete '{\"todo_id\": <todo_id>}'"),
    });
    instructions.push(Instruction {
      title: String::from("Delete a todo"),
      description: String::from("Use the following command to delete a todo:"),
      command: String::from("delete_todo '{\"todo_id\": <todo_id>}'"),
    });

    instructions.push(Instruction {
      title: String::from("Get help"),
      description: String::from("Use the following command to get help:"),
      command: String::from("get_help"),
    });

    return instructions;
  }

  // pub fn clear_all_todos(&mut self) {
  //   self.todos.clear();
  // }
}

#[cfg(test)]
mod tests {
  use super::*;
  // use near_sdk::MockedBlockchain;
  use near_sdk::test_utils::VMContextBuilder;
  use near_sdk::{testing_env, VMContext};

  fn get_context(is_view: bool) -> VMContext {
    VMContextBuilder::new()
      .signer_account_id("dalmasonto.testnet".to_string().try_into().unwrap())
      .is_view(is_view)
      .build()
  }

  // mark individual unit tests with #[test] for them to be registered and fired
  #[test]
  fn add_todo_test() {
    let _context = get_context(false);

    testing_env!(_context);
    let mut todos = Todos { todos: Vec::new() };
    todos.add_todo("test todo".to_string());
    todos.add_todo("test todo 2".to_string());
    assert_eq!(todos.todos.len(), 2);
  }

  #[test]
  fn mark_todo_as_complete_test() {
    let _context = get_context(false);

    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new() };
    todos.add_todo("Learn How to code in rust".to_string());
    todos.mark_todo_as_complete_or_incomplete(0);
    let get_one_todo = todos.get_todo(0);
    match get_one_todo {
      Some(x_) => {
        assert_eq!(x_.complete, true);
      }
      None => {
        env::log_str("Todo not found");
      }
    }
  }

  #[test]
  fn delete_user_todo_test() {
    let _context = get_context(false);

    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new() };
    todos.add_todo("Learn How to code in rust".to_string());
    todos.delete_todo(0);
    assert_eq!(todos.todos.len(), 0);
  }

  #[test]
  fn get_user_todos_test() {
    let _context = get_context(false);

    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new() };

    todos.add_todo("Learn How to code in rust".to_string());
    let user_todos = todos.get_my_todos();

    assert_eq!(user_todos.len(), 1);
  }

  // Test the get help function
  #[test]
  fn get_help_test() {
    let _context = get_context(false);
    testing_env!(_context);
    let mut todos: Todos = Todos { todos: Vec::new() };
    let help = todos.get_help();
    assert_eq!(help.len(), 5);
  }
}
