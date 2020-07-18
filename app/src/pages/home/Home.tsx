import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "react-bootstrap/Button";

import getLogger from "../../utils/logger";

import SimplePage from "../../components/layout/SimplePage";

import { SearchAction } from "../../modules/search";

const logger = getLogger("home");

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(SearchAction.search({}));
    }
  }, [isAuthenticated, dispatch]);

  return (
    <SimplePage>
      <h1>Case Based Reasoning</h1>
    </SimplePage>
  );
}

export default Home;
