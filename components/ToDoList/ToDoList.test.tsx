import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoList from "./ToDoList";
describe("ToDoList Component", () => {
  it("should render To-Do List", () => {
    render(<ToDoList />);
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
  });

  it("should add a new to-do", async () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    await userEvent.type(input, "Learn TypeScript");
    await userEvent.click(addButton);

    expect(screen.getByText(/Learn TypeScript/i)).toBeInTheDocument();
  });

  it("should toggle complete status of a to-do", async () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    await userEvent.type(input, "Learn Testing");
    await userEvent.click(addButton);

    const toDoItem = screen.getByText(/Learn Testing/i);
    await userEvent.click(toDoItem);

    expect(toDoItem).toHaveStyle("text-decoration: line-through");
  });

  it("should delete a to-do", async () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    await userEvent.type(input, "Learn Jest");
    await userEvent.click(addButton);

    const deleteButton = screen.getByText(/Delete/i);
    await userEvent.click(deleteButton);

    expect(screen.queryByText(/Learn Jest/i)).not.toBeInTheDocument();
  });

  it("should filter completed and pending to-dos", async () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add/i);

    await userEvent.type(input, "Task 1");
    await userEvent.click(addButton);
    await userEvent.type(input, "Task 2");
    await userEvent.click(addButton);

    const toDoItem1 = screen.getByText(/Task 1/i);
    await userEvent.click(toDoItem1);

    const completedFilter = screen.getByText(/Completed/i);
    await userEvent.click(completedFilter);
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();

    const pendingFilter = screen.getByText(/Pending/i);
    await userEvent.click(pendingFilter);
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
  });
});
