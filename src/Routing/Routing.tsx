import { Route, Routes } from "react-router-dom";
import Dashboardcomponent from "../Dashboard/Dashboardcomponetn";
import Listmanagecomponent from "../Listmanage/Listmanagecomponent";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboardcomponent />} />
      <Route path="todolist" element={<Listmanagecomponent />} />
    </Routes>
  );
}
