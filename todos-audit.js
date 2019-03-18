'use strict';

const { Audit } = require('lighthouse');

class TodosAudit extends Audit {
  static get meta() {
    return {
      id: 'todos-audit',
      title: 'Todos are loaded and rendered',
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      failureTitle: 'Todos loading is too slow.',
      description: 'Used to measure time for fetching and rendering todos list',
      requiredArtifacts: ['TodosGatherer'],
    };
  }

  static audit(artifacts) {
    const measure = artifacts.TodosGatherer;

    return {
      rawValue: measure,
      score: Math.max(1 - (measure / 1500), 0),
      displayValue: `Todos rendering is: ${measure}ms`
    };
  }
}
module.exports = TodosAudit;
