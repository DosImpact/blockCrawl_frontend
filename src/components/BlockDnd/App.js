import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import init_data from "./init_data";

import Column from "./Column";

import { CrwalingAPI } from "../../api";
// data: urlTagAPIData({
//   url: "https://movie.naver.com/movie/bi/mi/basic.nhn?code=187321",
//   tag:
//     "#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)",
// }),

const App = () => {
  // const [
  //   fetch_URL_TAG,
  //   { data: URL_TAG_data, loading: URL_TAG_loading, refetch: URL_TAG_refetch },
  // ] = useLazyQuery(URL_TAG);
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
    const { source, destination, draggableId } = result; // source => destination 으로 draggableId가 드래깅 되었다.
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // 변화전 Col,Idx => 변화 후 Col,Idx
    const startIdx = source.index;
    const endIdx = destination.index;

    const startCol = state.columns[source.droppableId];
    const endCol = state.columns[destination.droppableId];
    //CASE: 하나의 column안에서 위치만 change
    if (destination.droppableId === source.droppableId) {
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
    //CASE: Palette로 드랍 옮기기
    if (destination.droppableId === "column-1") {
      // columns -> tasksId 정렬
      startCol.tasksId.splice(startIdx, 1);
      endCol.tasksId.splice(endIdx, 0, draggableId);
      // columns  정렬 update
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
    //CASE: Logic으로 드랍 : Task의 복사
    if (destination.droppableId === "column-2") {
      const originTask = state.tasks[draggableId];

      const id = `task-${Date.now()}`;
      const cloneTask = {
        ...originTask,
        id,
        content: `${originTask.content}`,
      };

      endCol.tasksId.splice(endIdx, 0, id);
      //바뀐정보 update- 새로운 task, 및 column 정렬
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
    //CASE: Trash Bin 드랍 : Task의 삭제
    if (destination.droppableId === "column-3") {
      // column 정렬
      startCol.tasksId.splice(startIdx, 1);
      // 업데이트 column 정렬
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

  const compileStart = async () => {
    console.log("compileStart");
    // 우선 logic컬럼의 task들을 q에 넣고 , q가 반복문을 한 바퀴 돌자.
    let q = Array.from(state.columns["column-2"].tasksId);
    let currentURL = "";
    console.log("now q:", q);

    const GoToPage = (key, value) => {
      currentURL = value;
      setState((prev) => {
        prev.tasks[key].result.loading = false;
        prev.tasks[key].result.completed = true;
        return { ...prev };
      });
    };

    const GetSelector = async (key, value) => {
      if (currentURL === "") {
        setState((prev) => {
          prev.tasks[key].result.error = "No URL";
          return { ...prev };
        });
        return "No URL";
      }
      // loading state로 변환
      setState((prev) => {
        prev.tasks[key].result.loading = true;
        return { ...prev };
      });

      try {
        console.log("currentURL", currentURL);
        const {
          data: {
            data: { urlTag: data },
          },
          status,
        } = await CrwalingAPI.urlTagAPI({
          url: currentURL,
          tag: value,
        });

        if (status === 200) {
          setState((prev) => {
            prev.tasks[key].result.data = data;
            return { ...prev };
          });
        } else {
          throw Error("status not 200");
        }
      } catch (error) {
        setState((prev) => {
          prev.tasks[key].result.error = true;
          return { ...prev };
        });
      } finally {
        setState((prev) => {
          prev.tasks[key].result.loading = false;
          prev.tasks[key].result.completed = true;
          return { ...prev };
        });
      }
    };
    const GetIMG = async (key, value) => {
      if (currentURL === "") {
        setState((prev) => {
          prev.tasks[key].result.error = "No URL";
          return { ...prev };
        });
        return "No URL";
      }
      // loading state로 변환
      setState((prev) => {
        prev.tasks[key].result.loading = true;
        return { ...prev };
      });

      try {
        console.log("currentURL", currentURL);
        const {
          data: {
            data: { urlCapture: data },
          },
          status,
        } = await CrwalingAPI.urlCaptureAPI({
          url: currentURL,
        });

        if (status === 200) {
          setState((prev) => {
            prev.tasks[key].result.data = data;
            return { ...prev };
          });
        } else {
          throw Error("status not 200");
        }
      } catch (error) {
        setState((prev) => {
          prev.tasks[key].result.error = true;
          return { ...prev };
        });
      } finally {
        setState((prev) => {
          prev.tasks[key].result.loading = false;
          prev.tasks[key].result.completed = true;
          return { ...prev };
        });
      }
    };
    const GetPDF = async (key, value) => {
      if (currentURL === "") {
        setState((prev) => {
          prev.tasks[key].result.error = "No URL";
          return { ...prev };
        });
        return "No URL";
      }
      // loading state로 변환
      setState((prev) => {
        prev.tasks[key].result.loading = true;
        return { ...prev };
      });

      try {
        console.log("currentURL", currentURL);
        const {
          data: {
            data: { urlPDF: data },
          },
          status,
        } = await CrwalingAPI.urlPDFAPI({
          url: currentURL,
        });

        if (status === 200) {
          setState((prev) => {
            prev.tasks[key].result.data = data;
            return { ...prev };
          });
        } else {
          throw Error("status not 200");
        }
      } catch (error) {
        setState((prev) => {
          prev.tasks[key].result.error = true;
          return { ...prev };
        });
      } finally {
        setState((prev) => {
          prev.tasks[key].result.loading = false;
          prev.tasks[key].result.completed = true;
          return { ...prev };
        });
      }
    };
    while (q.length !== 0) {
      const key = q[0];
      const { id, content, input, value, isFetch } = state.tasks[key];
      console.log(id, content, input, value, isFetch);

      // CASE - 페이지 url을 변경한다.
      if (content === "Go To Page") {
        if (GoToPage(key, value)) {
          break;
        }
      }
      //CASE - page에서 Selector를 가져와야 하는 경우  : 셀렉터를 변경하고, data fetching을 진행한다.
      if (isFetch && content === "Get Selector") {
        if (await GetSelector(key, value)) {
          break;
        }
      }
      //CASE - page에서 이미지 가져와야 하는 경우
      if (isFetch && content === "Get IMG") {
        if (await GetIMG(key, value)) {
          break;
        }
      }
      //CASE - page에서 이미지 가져와야 하는 경우
      if (isFetch && content === "Get PDF") {
        if (await GetPDF(key, value)) {
          break;
        }
      }
      q.shift();
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
        {/* <h1>
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
        ))} */}
      </ResultBox>
      <div style={{ fontSize: "20px" }}>{JSON.stringify(state.tasks)}</div>
      <br />
      <div style={{ fontSize: "20px" }}>{JSON.stringify(state.columns)}</div>
    </>
  );
};

export default App;

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

// const URL_TAG = gql`
//   query urlTagQuery($tag: String!, $url: String!) {
//     urlTag(tag: $tag, url: $url)
//   }
// `;
