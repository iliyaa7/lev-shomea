import { Datatable } from "../Datatable/Datatable";
import { Sidebar } from "../Sidebar/Sidebar";
import "./List.scss";
import { useRef } from "react";
import CloseMenuByPageClick from "../../../../hooks/CloseMenuByPageClick";

const List: React.FC<{ cmpName: string }> = ({ cmpName }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  CloseMenuByPageClick(pageRef);
  return (
    <div ref={pageRef} className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable cmpName={cmpName} />
      </div>
    </div>
  );
};

export default List;
