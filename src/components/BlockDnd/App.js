import React, { useState } from "react";
import { toast } from "react-toastify";
import init_data from "./init_data";
import InitData from "./InitData";

import { CrwalingAPI } from "../../api";

import AppPresenter from "./AppPresenter";

const App = () => {
  // const [
  //   fetch_URL_TAG,
  //   { data: URL_TAG_data, loading: URL_TAG_loading, refetch: URL_TAG_refetch },
  // ] = useLazyQuery(URL_TAG);
  const [state, setState] = useState(InitData);

  const onDragStart = (start) => {
    // console.log("onDragStart", start);
    // document.body.style.transition = "all 0.2s ease";
    // document.body.style.color = "#a29bfe";
  };
  const onDragUpdate = (result) => {
    // console.log("onDragUpdate", result);
  };
  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.transition = "inherit";

    console.log("onDragEnd", result);
    const { source, destination, draggableId } = result; // source => destination 으로 draggableId가 드래깅 되었다.
    // dropzone 밖
    if (!destination) return;
    // 같은 위치로 드랍
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // 변화전 Col,Idx => 변화 후 Col,Idx
    const startIdx = source.index;
    const endIdx = destination.index;

    const startCol = state.toJS().columns[source.droppableId];
    const endCol = state.toJS().columns[destination.droppableId];
    //CASE: 하나의 column안에서 위치만 change
    if (destination.droppableId === source.droppableId) {
      const columnID = destination.droppableId;
      setState((prev) =>
        prev.updateIn(["columns", columnID, "tasksId"], (pdata) =>
          pdata.splice(startIdx, 1).splice(endIdx, 0, draggableId)
        )
      );
      return;
    }

    if (destination.droppableId === "column-2") {
      const originTask = state.toJS().tasks[draggableId];
      const id = `task-${Date.now()}`;
      setState((prev) =>
        prev
          .setIn(["tasks", id], { ...originTask, id })
          .updateIn(["columns", endCol.id, "tasksId"], (pdata) =>
            pdata.splice(endIdx, 0, id)
          )
      );
      return;
    }
    //CASE: Trash Bin 드랍 : Task의 삭제
    if (destination.droppableId === "column-3") {
      setState((prev) =>
        prev.deleteIn(["columns", startCol.id, "tasksId"], (pdata) =>
          pdata.splice(startIdx, 1)
        )
      );
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
            prev.tasks[key].result.error = null;
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
            prev.tasks[key].result.error = null;
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
            prev.tasks[key].result.error = null;
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
    if (q.length === 0) {
      toast.success("Logic Compile Sucess!");
      setState((prev) => {
        prev.compliedStatus = 0;
        return { ...prev };
      });
    } else {
      toast.error("Logic Compile Fail");
      setState((prev) => {
        prev.compliedStatus = 1;
        return { ...prev };
      });
    }
  };

  return (
    <AppPresenter
      state={state.toJS()}
      setState={setState}
      compileStart={() => console.log("complie")}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    />
  );
};

export default App;
