'use strict';

const { Gatherer } = require('lighthouse');


function performance() {
  return new Promise((res) => {
    let logger = (list) => {
      const entries = list.getEntries();
      window.todosPerformance = entries[0].duration
      res(entries[0].duration);
    }
    let observer = new PerformanceObserver(logger);
    observer.observe({ entryTypes: ['measure'], buffered: true });
  });
}


class TodosGatherer extends Gatherer {
  beforePass(options) {
    const driver = options.driver;
    return driver.evaluateScriptOnNewDocument(`(${performance.toString()})()`)
  }

  afterPass(options) {
    const driver = options.driver;
    return driver.evaluateAsync('window.todosPerformance')
  }
}

module.exports = TodosGatherer;
