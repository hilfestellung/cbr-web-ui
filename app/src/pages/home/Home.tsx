import React from "react";

import Button from "react-bootstrap/Button";

import { useAjax } from "../../utils/Ajax";
import getLogger from "../../utils/logger";

import SimplePage from "../../components/layout/SimplePage";

const logger = getLogger("home");

function Home() {
  const { get } = useAjax();
  return (
    <SimplePage>
      <h1>Case Based Reasoning</h1>
      <Button
        onClick={() =>
          get("https://api.case-based-reasoning.org").catch((err: any) =>
            logger.error(err)
          )
        }
      >
        Suchen
      </Button>
    </SimplePage>
  );
}

export default Home;
