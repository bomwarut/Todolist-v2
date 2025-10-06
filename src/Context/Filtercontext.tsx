import { createContext, useState, type ReactNode } from "react";
import type { filterobjecttype } from "../Interface/globalinterface";

const FilterContext = createContext<any | undefined>(undefined);

const setdataobject: filterobjecttype = {
  selectfilter: 0,
  page: 1,
};

export default function FilterProvider({ children }: { children: ReactNode }) {
  const [filtersinglestate, setfiltersinglestate] =
    useState<filterobjecttype>(setdataobject);

  const filterfunc = (type: number): void => {
    if (type !== filtersinglestate.selectfilter) {
      setfiltersinglestate({ selectfilter: type, page: 1 });
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filtersinglestate,
        setfiltersinglestate,
        filterfunc
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext };
