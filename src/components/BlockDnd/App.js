import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

import init_data from "./init_data";

import Column from "./Column";

const App = () => {
  const [state, setState] = useState(init_data);

  const onDragStart = (start) => {
    console.log("onDragStart", start);
    document.body.style.transition = "all 0.2s ease";
    document.body.style.color = "#a29bfe";
  };
  const onDragUpdate = (result) => {
    // console.log("onDragUpdate", result);
  };
  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.transition = "inherit";

    console.log("onDragEnd", result);
    const { destination, draggableId, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startIdx = source.index;
    const endIdx = destination.index;

    const startCol = state.columns[source.droppableId];
    const endCol = state.columns[destination.droppableId];

    if (destination.droppableId === source.droppableId) {
      // 하나의 column안에서 위치만 change

      const nowCol = startCol;
      nowCol.tasksId.splice(startIdx, 1);
      nowCol.tasksId.splice(endIdx, 0, draggableId);

      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [nowCol.id]: nowCol,
        },
      }));
      return;
    }
    if (destination.droppableId === "column-1") {
      startCol.tasksId.splice(startIdx, 1);
      endCol.tasksId.splice(endIdx, 0, draggableId);
      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [startCol.id]: startCol,
          [endCol.id]: endCol,
        },
      }));
      return;
    }

    if (destination.droppableId === "column-2") {
      const originTask = state.tasks[draggableId];

      const id = `task-${Date.now()}`;
      const cloneTask = {
        ...originTask,
        id,
        content: `${originTask.content}`,
      };

      endCol.tasksId.splice(endIdx, 0, id);
      setState((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [cloneTask.id]: cloneTask,
        },
        columns: {
          ...prev.columns,
          [endCol.id]: endCol,
        },
      }));
      return;
    }
    if (destination.droppableId === "column-3") {
      startCol.tasksId.splice(startIdx, 1);
      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [startCol.id]: startCol,
          [endCol.id]: endCol,
        },
      }));
      return;
    }
  };

  const getCode = (content, args) => {
    if (args[0] === "") {
      return null;
    }
    if (content === "Go To Page") return `await page.goto(${args[0]});`;
    if (content === "Get Selector") {
      return `
      let text;
      text =  await page.evaluate(
      ({ ${args[0]} }) => {
        const tagNode = document.querySelector(${args[0]});
        if (tagNode) {
          return tagNode.textContent;
        }
      },
      { ${args[0]} }
    );
    result = text.trim();`;
    }
    return null;
  };

  const compileStart = () => {
    console.log("compileStart");
    try {
      const targetCol = state.columns["column-2"];
      const tasks = Array.from(targetCol.tasksId).map(
        (id, idx) => state.tasks[id]
      );
      console.log(tasks);
      let compiledCode = "";
      tasks.map((task) => {
        const code = getCode(task.content, [task?.value ?? ""]);
        if (!code) {
          throw Error("complie Error");
        }
        compiledCode += code;
      });
      setState((prev) => ({
        ...prev,
        compliedStatus: 1,
        compiledCode,
      }));
      console.log("compile Success!");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        compliedStatus: -1,
      }));
      console.log("compile fail!", error);
    }
  };

  return (
    <>
      <Container>
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
        >
          {state.columnOrder.map((columnId, idx) => {
            const column = state.columns[columnId];
            const tasks = column.tasksId.map((id) => state.tasks[id]);
            return (
              <Column
                tasks={tasks}
                column={column}
                key={idx}
                setState={setState}
              />
            );
          })}
        </DragDropContext>
      </Container>
      <ResultBox Status={state.compliedStatus}>
        <button onClick={compileStart}>Complie</button>
        <h1>
          컴파일 결과{" "}
          <span role="img">
            {state.compliedStatus === 0
              ? "🧶"
              : state.compliedStatus === 1
              ? "✅"
              : "❌"}
          </span>
        </h1>
        {JSON.stringify(state.compiledCode)}
        <hr></hr>
        {state.compiledCode.split("\n").map((s) => (
          <div>{s}</div>
        ))}
      </ResultBox>
      <div>{JSON.stringify(state)}</div>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const ResultBox = styled.div`
  width: 100%;
  min-height: 200px;
  font-size: 20px;
  background-color: ${(props) =>
    props.Status === 1
      ? `${props.theme.MintColor}`
      : props.Status === -1
      ? `${props.theme.lightRedColor}`
      : `${props.theme.lightGrayColor}`};
`;
export default App;
