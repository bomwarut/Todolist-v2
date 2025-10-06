import { createContext, useState, type ReactNode } from "react";
import type { Selectdata, Task, Taskmange } from "../Interface/globalinterface";
import Useapi from "../API/Apiglobal";

const TaskContext = createContext<any | undefined>(undefined);

const selectdataobject: Selectdata = {
  Task: [],
  prevTask: [],
  uinotfound: false,
  loading: false,
  saving: false,
  sorted: false,
};

export default function TodoProvider({ children }: { children: ReactNode }) {
  const [singlestate, setsinglestate] = useState<Selectdata>(selectdataobject);
  const [Taskmangastate, setTaskmangastate] = useState<Taskmange>({
    selectedCard: 0,
    openmodal: false,
    opensnackbar: false,
    Taskdata: {
      userId: 0,
      id: 0,
      title: "",
      describtion: "",
      completed: false,
      datestart: "",
      dateend: "",
      progress: 0,
      expanded: false,
    },
  });

  const notdonetask = singlestate.Task.filter(
    (t: Task) => !t.completed && t.progress === 0
  ).length;
  const inprogress = singlestate.Task.filter(
    (t: Task) => !t.completed && t.progress > 0
  ).length;
  const donetask = singlestate.Task.filter((t: Task) => t.completed).length;
  const notdonetaskarray = singlestate.Task.filter(
    (item: Task) => item.progress === 0
  );
  const inprogresstaskarray = singlestate.Task.filter(
    (item: Task) => item.progress > 0 && item.progress < 100
  );
  const donetaskarray = singlestate.Task.filter(
    (item: Task) => item.progress === 100
  );

  const initialdata = (): void => {
    setsinglestate((prev: Selectdata) => ({ ...prev, loading: true }));

    const setdata = (res: any): Task[] =>
      res.data.map((item: Task) => ({
        ...item,
        describtion: "",
        datestart: "",
        dateend: "",
        progress: item.completed ? 100 : 0,
        expanded: false,
      }));

    Useapi("https://jsonplaceholder.typicode.com/todos")
      .then((res: any) => {
        setTimeout(() => {
          setsinglestate((prev: Selectdata) =>
            res.status === 200
              ? {
                  ...prev,
                  Task: setdata(res),
                  prevTask: setdata(res),
                  uinotfound: false,
                  loading: false,
                }
              : {
                  ...prev,
                  Task: [],
                  prevTask: [],
                  uinotfound: true,
                  loading: false,
                }
          );
        }, 1000);
      })
      .catch(() => {
        setsinglestate((prev: Selectdata) => ({
          ...prev,
          Task: [],
          prevTask: [],
          uinotfound: true,
          loading: false,
        }));
      });
  };

  const Togglesnackbar = (val: boolean): void =>
    setTaskmangastate((prev: Taskmange) => ({
      ...prev,
      opensnackbar: val,
    }));

  const Togglemodal = (item: Task, val: boolean): void =>
    setTaskmangastate((prev: Taskmange) => ({
      ...prev,
      Taskdata: item,
      openmodal: val,
    }));

  const ToggleTaskstatus = (item: Task): void => {
    const setdata = (prev: any): Task[] =>
      prev.Task.map((item2: Task) =>
        item2.id === item.id
          ? {
              ...item2,
              completed: !item2.completed,
              progress: item2.completed ? 0 : 100,
            }
          : { ...item2 }
      );

    setsinglestate((prev: Selectdata) => ({
      ...prev,
      Task: setdata(prev),
      prevTask: setdata(prev),
    }));
    Togglesnackbar(true);
  };

  const Selectask = (item: Task): void => {
    if (Taskmangastate.selectedCard !== item.id) {
      setTaskmangastate((prev) => ({
        ...prev,
        selectedCard: item.id,
      }));
    }
  };

  const Expandcard = (item: Task): void =>
    setsinglestate((prev: Selectdata) => ({
      ...prev,
      Task: prev.Task.map((item2: Task) =>
        item2.id === item.id
          ? { ...item2, expanded: !item2.expanded }
          : { ...item2 }
      ),
    }));

  const Savetask = (item: Task, type: number): void => {
    const setdata = (prev: any): Task[] =>
      type === 1
        ? [...prev.Task, { ...item }]
        : prev.Task.map((item2: Task) =>
            item2.id === item.id
              ? {
                  ...item2,
                  title: item.title,
                  describtion: item.describtion,
                  progress: item.progress,
                  completed: item.progress === 100 ? true : false,
                }
              : item2
          );

    setsinglestate((prev: Selectdata) => ({
      ...prev,
      Task: setdata(prev),
      prevTask: setdata(prev),
      saving: true,
    }));
    setTimeout(() => {
      setsinglestate((prev: Selectdata) => ({
        ...prev,
        saving: false,
      }));
      Togglemodal(
        {
          userId: 0,
          id: 0,
          title: "",
          describtion: "",
          completed: false,
          datestart: "",
          dateend: "",
          progress: 0,
          expanded: false,
        },
        false
      );
      Togglesnackbar(true);
    }, 1000);
  };

  const Deletetask = (item: Task): void => {
    const setdata = (prev: any): Task[] =>
      prev.Task.filter((item2: Task) => item2.id !== item.id);

    setsinglestate((prev: Selectdata) => ({
      ...prev,
      Task: setdata(prev),
      prevTask: setdata(prev),
      saving: true,
    }));
    setTimeout(() => {
      setsinglestate((prev: Selectdata) => ({
        ...prev,
        saving: false,
      }));
      Togglemodal(
        {
          userId: 0,
          id: 0,
          title: "",
          describtion: "",
          completed: false,
          datestart: "",
          dateend: "",
          progress: 0,
          expanded: false,
        },
        false
      );
      Togglesnackbar(true);
    }, 1000);
  };

  return (
    <TaskContext.Provider
      value={{
        singlestate,
        setsinglestate,
        Taskmangastate,
        initialdata,
        Selectask,
        Expandcard,
        Togglemodal,
        Togglesnackbar,
        Savetask,
        Deletetask,
        ToggleTaskstatus,
        notdonetask,
        inprogress,
        donetask,
        notdonetaskarray,
        inprogresstaskarray,
        donetaskarray,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext };
