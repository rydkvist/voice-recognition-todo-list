import { TodoItemType, useTodoList } from "./TodoContext";
import { taskColors } from "../components/Task";
import { colors } from "../utils/colors";

const initialState: TodoItemType[] = [
  {
    id: 0,
    value: "Welcome! Here you can add, remove, and finish tasks",
    bg: colors.lightCyan,
    borderColor: colors.cyan,
  },
  {
    id: 1,
    value: "They will be saved on your local device automatically :)",
    bg: colors.pink,
    borderColor: colors.darkPink,
  },
  {
    id: 2,
    value: "You can also choose to add them with voice recognition",
    bg: colors.pistachio,
    borderColor: colors.olive,
  },
  {
    id: 3,
    value: "Or just manually typing the tasks!",
    bg: colors.lightYellow,
    borderColor: colors.yellow,
  },
];

describe("Test the TODO List context", () => {
  //   const { onRemoveTask } = useTodoList();

  it("Should render 4 items", () => {
    expect(initialState.length).toBe(4);
  });

  //   it("Should have 3 items after removing one", () => {
  //     onRemoveTask(2);

  //     expect(initialState.length).toBe(3);
  //     expect(initialState[2].value).toBe("Or just manually typing the tasks!");
  //   });
});
