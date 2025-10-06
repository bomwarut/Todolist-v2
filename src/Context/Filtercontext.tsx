import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  filterobjecttype,
  Selectdata,
  Task,
} from "../Interface/globalinterface";
import { TaskContext } from "./Taskcontext";

const FilterContext = createContext<any | undefined>(undefined);

const setdataobject: filterobjecttype = {
  selectfilter: 0,
  page: 1,
};

export default function FilterProvider({ children }: { children: ReactNode }) {
  const taskcontext: any = useContext(TaskContext);
  const { singlestate, setsinglestate }: any = taskcontext;
  let searchTimeout = useRef(0);

  const [filtersinglestate, setfiltersinglestate] =
    useState<filterobjecttype>(setdataobject);

  const filterfunc = (type: number): void => {
    if (type !== filtersinglestate.selectfilter) {
      setfiltersinglestate({ selectfilter: type, page: 1 });
    }
  };

  const search = (value: string): void => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (value.length > 0) {
      setsinglestate((prev: Selectdata) => ({ ...prev, loading: true }));

      searchTimeout.current = setTimeout(() => {
        const results: Task[] = singlestate.prevTask.filter((task: Task) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        );

        setfiltersinglestate((prev: filterobjecttype) => ({
          ...prev,
          page: 1,
        }));

        setsinglestate((prev: Selectdata) => ({
          ...prev,
          Task: results,
          loading: false,
        }));
      }, 1000);
    } else {
      setsinglestate((prev: Selectdata) => ({
        ...prev,
        Task: prev.prevTask,
      }));
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filtersinglestate,
        setfiltersinglestate,
        filterfunc,
        search,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext };
