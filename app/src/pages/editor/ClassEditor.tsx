import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClassesSelector } from "../../modules/classes";

function ClassEditor() {
  const { id } = useParams();

  const classes = useSelector(ClassesSelector.getItems);

  const [modelClass, setModelClass] = useState<any>();

  useEffect(() => {
    if (classes) {
      setModelClass(classes.find((entry) => entry.id === id));
    }
  }, [id, classes]);

  if (modelClass) {
    return (
      <div>
        {modelClass.id} ({modelClass.type})
      </div>
    );
  }
  return null;
}

export default ClassEditor;
