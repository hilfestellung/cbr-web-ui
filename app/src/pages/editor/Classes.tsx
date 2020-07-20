import React from "react";

import Workspace from "../../components/layout/Workspace";

import ClassesList from "./ClassesList";
import { useParams } from "react-router-dom";

function Classes() {
  const pa = useParams();
  console.log("Classes Class ID:", pa);
  return (
    <Workspace
      left={<ClassesList />}
      right={<div>Hallo Rechts</div>}
      content={<div>Content Hallo</div>}
    ></Workspace>
  );
}

export default Classes;
