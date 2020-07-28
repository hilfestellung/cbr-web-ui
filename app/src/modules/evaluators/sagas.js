import { takeEvery } from 'redux-saga/effects';

import { EvaluatorAction, EvaluatorActionType } from './actions';
import getLogger from '../../utils/logger';
import {
  httpGetAuthenticated,
  httpPostAuthenticated,
  httpPutAuthenticated,
  httpDeleteAuthenticated,
} from '../../utils/sagas';

const logger = getLogger('evaluators');

function* fetchEvaluatorsSaga() {
  logger.debug('Fetching evaluators');
  yield httpGetAuthenticated(
    '/evaluator',
    EvaluatorAction.fetchEvaluatorsSuccess,
    EvaluatorAction.fetchEvaluatorsFailed
  );
}

function* addEvaluatoresSaga({ payload: { evaluator } }) {
  logger.debug('Adding evaluator', evaluator);
  yield httpPostAuthenticated(
    `/evaluator`,
    evaluator,
    EvaluatorAction.addEvaluatorSuccess,
    EvaluatorAction.addEvaluatorFailed
  );
}

function* putEvaluatoresSaga({ payload: { evaluator } }) {
  logger.debug('Putting evaluator', evaluator);
  yield httpPutAuthenticated(
    `/evaluator/${evaluator.id}`,
    evaluator,
    EvaluatorAction.putEvaluatorSuccess,
    EvaluatorAction.putEvaluatorFailed
  );
}

function* removeEvaluatoresSaga({ payload: { id } }) {
  logger.debug('Putting evaluator', id);
  yield httpDeleteAuthenticated(
    `/evaluator/${id}`,
    EvaluatorAction.removeEvaluatorSuccess,
    EvaluatorAction.removeEvaluatorFailed
  );
}

export function* watchEvaluatorActions() {
  yield takeEvery(EvaluatorActionType.FETCH_EVALUATORS, fetchEvaluatorsSaga);
  yield takeEvery(EvaluatorActionType.ADD_EVALUATOR, addEvaluatoresSaga);
  yield takeEvery(EvaluatorActionType.PUT_EVALUATOR, putEvaluatoresSaga);
  yield takeEvery(EvaluatorActionType.REMOVE_EVALUATOR, removeEvaluatoresSaga);
}
