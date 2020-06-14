import React, { useState } from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  padding: 8px;
  display: flex;
  height: 100px;

  background: white;

  display: flex;
  flex-flow: column nowrap;
`;

const Task = ({ task, index, setState }) => {
  const hasInput = task?.input ?? false;
  const inputHook = useInput(task.value);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit", inputHook.value);
    setState((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [task.id]: {
          ...prev.tasks[task.id],
          value: inputHook.value,
        },
      },
    }));
  };
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
          {hasInput && (
            <form onSubmit={onSubmit}>
              <input {...inputHook}></input>
              {/* <select>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select> */}
            </form>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    if (e) {
      setValue(e.target.value);
    }
  };
  return { value, onChange };
};
