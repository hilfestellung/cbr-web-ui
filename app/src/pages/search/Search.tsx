import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import memoize from "lodash/memoize";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import SimplePage from "../../components/layout/SimplePage";
import { useSelector } from "react-redux";
import { LocationSelector } from "../../modules/location";

function Search() {
  const history = useHistory();

  const query = useSelector(LocationSelector.getSearch);

  const [newQuery, setNewQuery] = useState<any>({});

  const startSearch = useCallback(
    (e: any) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
      const search = new URLSearchParams(newQuery);
      history.push("/search?" + search.toString());
    },
    [history, newQuery]
  );

  const changeInput = useCallback(
    (name: string) => {
      return memoize((e: any) => {
        setNewQuery({ ...newQuery, [name]: e.target.value });
      }) as any;
    },
    [newQuery, setNewQuery]
  );

  useEffect(() => {
    if (query) {
      setNewQuery(query);
    }
  }, [query, setNewQuery]);

  return (
    <SimplePage>
      <div>Search</div>
      <Form onSubmit={startSearch}>
        <Form.Group controlId="queryMiles">
          <Form.Label>Miles</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your mileage"
            onChange={changeInput("miles")}
            value={newQuery["miles"] || ""}
          />
          <Form.Text className="text-muted">
            We'll never share your mileage with anyone else.
          </Form.Text>
        </Form.Group>
        <Button type="submit" onClick={startSearch}>
          Suchen
        </Button>
      </Form>
    </SimplePage>
  );
}

export default Search;
