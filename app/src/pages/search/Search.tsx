import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

import SimplePage from "../../components/layout/SimplePage";

function Search() {
  const history = useHistory();

  const startSearch = useCallback(() => {
    history.push("/search?miles=3000");
  }, [history]);
  return (
    <SimplePage>
      <div>Search</div>
      <Button onClick={startSearch}>Suchen</Button>
    </SimplePage>
  );
}

export default Search;
