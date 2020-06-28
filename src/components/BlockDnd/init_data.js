export default {
  tasks: {
    "task-1": { id: "task-1", content: "if" },
    "task-2": { id: "task-2", content: "if end" },
    "task-3": { id: "task-3", content: "while" },
    "task-4": { id: "task-4", content: "while end" },
    "task-5": {
      id: "task-5",
      content: "Go To Page",
      input: true,
      isFetch: false,
      result: { error: null, loading: false, data: null, completed: false },
      value:
        "https://github.com/atlassian/react-beautiful-dnd/blob/master/README.md#documentation-",
    },
    "task-6": {
      id: "task-6",
      content: "Get Selector",
      input: true,
      isFetch: true,
      result: { error: null, loading: false, data: null, completed: false },
      value: "#readme > article > h1",
    },
    "task-7": { id: "task-7", content: "Return Format", input: true },
    "task-8": { id: "task-8", content: "Get PDF" },
    "task-9": { id: "task-9", content: "Get IMG" },
    "task-10": {
      id: "task-10",
      content: "Go To Page",
      input: true,
      isFetch: false,
      result: { error: null, loading: false, data: null, completed: false },
      value:
        "https://github.com/atlassian/react-beautiful-dnd/blob/master/README.md#documentation-",
    },
    "task-11": {
      id: "task-11",
      content: "Get Selector",
      input: true,
      isFetch: true,
      result: { error: null, loading: false, data: null, completed: false },
      value: "#readme > article > h1",
    },
  },
  compiledCode: "",
  compliedStatus: 0,
  // columns에 대한 정보 및 task과의 관계
  columns: {
    "column-1": {
      id: "column-1",
      title: "Palette🎨",
      tasksId: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
        "task-9",
      ],
    },
    "column-2": {
      id: "column-2",
      title: "Logic💠",
      tasksId: ["task-10", "task-11"],
    },
    "column-3": {
      id: "column-3",
      title: "🗑 Trash bin",
      tasksId: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"], // column랜더링 순서
};
