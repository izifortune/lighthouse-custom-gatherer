'use strict';

const { Gatherer } = require('lighthouse');


function performance() {
  return new Promise((res) => {
    const logger = (list) => {
      const entries = list.getEntries();
      res(entries[0].duration);
    }
    const observer = new PerformanceObserver(logger);
    observer.observe({ entryTypes: ['measure'] });
  });
}


class TodosGatherer extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    return driver.evaluateAsync(`(${performance.toString()})()`)
  }
}

module.exports = TodosGatherer;
