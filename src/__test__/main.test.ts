/**
 * @jest-environment jsdom
 */
 import { test, expect, beforeEach, describe, jest,  } from "@jest/globals";
 import * as functions from "./../ts/functions";
 import * as mFunctions from "./../ts/main";
 import { Todo } from "./../ts/models/Todo";
 import { IAddResponse } from "../ts/models/IAddResult";
 
 describe("initFirst", () => {
   beforeEach(() => {
     jest.resetModules();
     jest.restoreAllMocks();
   });
 
   test("should be able to call clearTodos with click", () => {
     // Arrange
     let spy = jest.spyOn(mFunctions, "clearTodos").mockReturnValue();
     document.body.innerHTML = 
     `<button type="button" id="clearTodos">Rensa lista</button>`;
     mFunctions.initFirst();
     // Act
     document.getElementById("clearTodos")?.click();
     // Assert
     expect(spy).toHaveBeenCalled();
   });
   test("should start createNewTodo with submit", () => {
     // Arrange
     let spy = jest.spyOn(mFunctions, "createNewTodo").mockReturnValue();
     document.body.innerHTML = 
     `<form id="newTodoForm">
     <div>
       <input type="text" id="newTodoText" />
       <button id="btnCreateTodo">Skapa</button>
       <button type="button" id="clearTodos">Rensa lista</button>
     </div>
     <div id="error" class="error"></div>
   </form>`;
     mFunctions.initFirst();
     // Act
     document.getElementById("btnCreateTodo")?.click();
     // Assert
     expect(spy).toHaveBeenCalled();
   });
 });

 describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should create done task in the list", () => {
    // Arrange
    let myList: Todo[] = [{ text: "ABCD", done: true },{ text: "ABCDE", done: true },];
    document.body.innerHTML = 
    `<ul id="todos" class="todo"></ul>`;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;
    // Act
    mFunctions.createHtml(myList);
    // Assert
    expect(myList[myList.length - 1].done).toBe(true);
    expect(todosContainer.innerHTML).toBe(
      `<li class="todo__text--done todo__text">ABCD</li><li class="todo__text--done todo__text">ABCDE</li>`
    );
  });
  test("should make todo not done in the list", () => {
    // Arrange
    let myList: Todo[] = [{ text: "ABCD", done: false },{ text: "ABCDE", done: false },];
    document.body.innerHTML = 
    `<ul id="todos" class="todo"></ul>`;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;
    // Act
    mFunctions.createHtml(myList);
    // Assert
    expect(myList[myList.length - 1].done).toBe(false);
    expect(todosContainer.innerHTML).toBe(
      `<li class="todo__text">ABCD</li><li class="todo__text">ABCDE</li>`
    );
  });
});

describe("toggleTodo", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should start changeTodo function", () => {
    // Arrange
    let spy = jest.spyOn(functions, "changeTodo").mockReturnValue();
    let todoTask: Todo = new Todo("test123", false);
    // Act
    mFunctions.toggleTodo(todoTask);
    // Assert
    expect(spy).toHaveBeenCalled();
  });
  test("should call the createHtml function", () => {
    // Arrange
    let spy = jest.spyOn(mFunctions, "createHtml").mockReturnValue();
    let todoTask: Todo = new Todo("test123", false);
    // Act
    mFunctions.toggleTodo(todoTask);
    // Assert
    expect(spy).toHaveBeenCalled();
  });
});
 
 describe("createNewTodo", () => {
   beforeEach(() => {
     jest.resetModules();
     jest.restoreAllMocks();
   });

   test("should call createHtml if todo is added successfully", () => {
     // Arrange
     let spy = jest.spyOn(mFunctions, "createHtml").mockReturnValue();
     let task: string = "test123";
     let myList: Todo[] = [{ text: "ABCD", done: false },{ text: "ABCDE", done: false },];
     let result: IAddResponse = functions.addTodo(task, myList);
     // Act
     mFunctions.initFirst();
     mFunctions.createNewTodo(task, myList);
     // Assert
     expect(result.success).toBe(true);
     expect(spy).toHaveBeenCalled();
   });
   test("should call displayError if todo is not added successfully", () => {
     // Arrange
     let spy = jest.spyOn(mFunctions, "displayError").mockReturnValue();
     let todoText: string = "";
     let myList: Todo[] = [{ text: "ABCD", done: false },{ text: "ABCDE", done: false },];
     let result: IAddResponse = functions.addTodo(todoText, myList);
     // Act
     mFunctions.createNewTodo(todoText, myList);
     // Assert
     expect(result.success).toBe(false);
     expect(spy).toHaveBeenCalled();
   });
 });

 describe("clearTodos", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should call the removeAllTodos function", () => {
    // Arrange
    let spy = jest.spyOn(mFunctions, "createHtml").mockReturnValue();
    let watcher = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
    let myList: Todo[] = [{ text: "ABCD", done: false },{ text: "ABCDE", done: false },];
    // Act
    mFunctions.clearTodos(myList);
    // Assert
    expect(watcher).toHaveBeenCalled();
  });

  test("should call the createHtml function", () => {
    // Arrange
    let spy = jest.spyOn(mFunctions, "createHtml").mockReturnValue();
    let myList: Todo[] = [{ text: "ABCD", done: false },{ text: "ABCDE", done: false },];
    // Act
    mFunctions.clearTodos(myList);
    // Assert
    expect(spy).toHaveBeenCalled();
  });
});
 
 describe("displayError", () => {
   beforeEach(() => {
     jest.resetModules();
     jest.restoreAllMocks();
   });
   test("should output content in errorContainer", () => {
     // Arrange
     let display: boolean = true;
     let error: string = "ERROR";
     document.body.innerHTML = 
     `<div id="error"></div>`;
     let errorContainer: HTMLDivElement = document.getElementById("error") as HTMLDivElement;
     errorContainer.innerHTML = error;
     // Act
     mFunctions.displayError(error, display);
     // Assert
     expect(errorContainer.classList.length).toBe(1);
     expect(errorContainer.innerHTML).toBe("ERROR");
   });
 
   test("should not display content in errorContainer", () => {
     // Arrange
     let display: boolean = false;
     let error: string = "ERROR";
     document.body.innerHTML = 
     `<div id="error"></div>`;
     let errorContainer: HTMLDivElement = document.getElementById("error") as HTMLDivElement;
     errorContainer.innerHTML = error;
     // Act
     mFunctions.displayError(error, display);
     // Assert
     expect(errorContainer.classList.length).toBe(0);
   });
 });