const { classFactory } = require('@hilfestellung/cbr-kernel');
const { memoizeLRU } = require('../../../utils/misc');

function createValidationRulesRaw(aggregateClass, classes) {
  const result = { attributes: [] };
  if (aggregateClass && Array.isArray(aggregateClass.attributes)) {
    aggregateClass.attributes.forEach((attribute) => {
      const defintion = classes.find((entry) => entry.id === attribute.type);
      const modelClass = classFactory(defintion);
      result.attributes.push({
        value: (value) => {
          let result = {};
          try {
            // modelClass.readObject(value);
            if (modelClass.predicate) {
              if (modelClass.predicate.isRange()) {
                const range = modelClass.predicate;
                const min = range.getMinimum().id;
                const max = range.getMaximum().id;
                result = {
                  ...result,
                  valid: min <= value && value <= max,
                  require: {
                    range: true,
                    min,
                    max,
                  },
                };
              }
            }
          } catch (err) {
            console.error(err);
            result = { ...result, valid: false, error: err };
          }
          return result;
        },
      });
    });
  }
  return result;
}

export const createValidationRules = memoizeLRU(createValidationRulesRaw, 2);
