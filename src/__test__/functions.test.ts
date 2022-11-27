import { changeTodo, removeAllTodos, addTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

/* Should toggle test */
test("should toggle", () => {
    // Arrange
    let newTodo = new Todo("", true);
    // Act
    changeTodo(newTodo);
    // Assert
    expect(newTodo.done).toBe(false)
});

/* Should remove all todos test */
test("should remove all", () => {
    // Arrange
    let newTodo1 = new Todo("", true);
    let newTodo2 = new Todo("", true);
    let newTodo3 = new Todo("", true);

    let todos: Todo[] = [newTodo1, newTodo2, newTodo3];
    // Act
    removeAllTodos(todos);
    // Assert
    expect(todos.length).toBe(0);
});

/* Should check if input is over 2 in length  */
test("should check input if over 2", () => {
    // Arrange
    let todoText: string = "ABC";
    let todos: Todo[] = [];
    // Act
    addTodo(todoText, todos);
    // Assert
    expect(todos.length).toBe(1);
});

/* Should check if input is under 2 in length  */
test("should check input if under 2", () => {
    // Arrange
    let todoText: string = "";
    let todos: Todo[] = [];
    // Act
    addTodo(todoText, todos);
    // Assert
    expect(todos.length).toBe(0);
});