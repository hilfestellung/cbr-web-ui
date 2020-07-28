import { createAction } from 'redux-actions';

const FETCH_EVALUATORS = '[Evaluators] Fetch evaluators';
const FETCH_EVALUATORS_SUCCESS = '[Evaluators] Fetch evaluators success';
const FETCH_EVALUATORS_FAILED = '[Evaluators] Fetch evaluators failed';

const ADD_EVALUATOR = '[Evaluators] Add evaluator';
const ADD_EVALUATOR_SUCCESS = '[Evaluators] Add evaluator success';
const ADD_EVALUATOR_FAILED = '[Evaluators] Add evaluator failed';

const PUT_EVALUATOR = '[Evaluators] Put evaluator';
const PUT_EVALUATOR_SUCCESS = '[Evaluators] Put evaluator success';
const PUT_EVALUATOR_FAILED = '[Evaluators] Put evaluator failed';

const REMOVE_EVALUATOR = '[Evaluators] Remove evaluator';
const REMOVE_EVALUATOR_SUCCESS = '[Evaluators] Remove evaluator success';
const REMOVE_EVALUATOR_FAILED = '[Evaluators] Remove evaluator failed';

const fetchEvaluators = createAction(FETCH_EVALUATORS);
const fetchEvaluatorsSuccess = createAction(
  FETCH_EVALUATORS_SUCCESS,
  (items) => ({
    items,
  })
);
const fetchEvaluatorsFailed = createAction(
  FETCH_EVALUATORS_FAILED,
  (error) => ({
    error: error,
  })
);

const addEvaluator = createAction(ADD_EVALUATOR, (evaluator) => ({
  evaluator,
}));
const addEvaluatorSuccess = createAction(
  ADD_EVALUATOR_SUCCESS,
  (evaluator) => ({
    evaluator,
  })
);
const addEvaluatorFailed = createAction(ADD_EVALUATOR_FAILED, (error) => ({
  error,
}));

const putEvaluator = createAction(PUT_EVALUATOR, (evaluator) => ({
  evaluator,
}));
const putEvaluatorSuccess = createAction(
  PUT_EVALUATOR_SUCCESS,
  (evaluator) => ({
    evaluator,
  })
);
const putEvaluatorFailed = createAction(PUT_EVALUATOR_FAILED, (error) => ({
  error,
}));

const removeEvaluator = createAction(REMOVE_EVALUATOR, (id) => ({
  id,
}));
const removeEvaluatorSuccess = createAction(
  REMOVE_EVALUATOR_SUCCESS,
  (evaluator) => ({
    evaluator,
  })
);
const removeEvaluatorFailed = createAction(
  REMOVE_EVALUATOR_FAILED,
  (error) => ({
    error,
  })
);

export const EvaluatorAction = {
  fetchEvaluators,
  fetchEvaluatorsSuccess,
  fetchEvaluatorsFailed,
  addEvaluator,
  addEvaluatorSuccess,
  addEvaluatorFailed,
  putEvaluator,
  putEvaluatorSuccess,
  putEvaluatorFailed,
  removeEvaluator,
  removeEvaluatorSuccess,
  removeEvaluatorFailed,
};

export const EvaluatorActionType = {
  FETCH_EVALUATORS,
  FETCH_EVALUATORS_SUCCESS,
  FETCH_EVALUATORS_FAILED,
  ADD_EVALUATOR,
  ADD_EVALUATOR_SUCCESS,
  ADD_EVALUATOR_FAILED,
  PUT_EVALUATOR,
  PUT_EVALUATOR_SUCCESS,
  PUT_EVALUATOR_FAILED,
  REMOVE_EVALUATOR,
  REMOVE_EVALUATOR_SUCCESS,
  REMOVE_EVALUATOR_FAILED,
};
