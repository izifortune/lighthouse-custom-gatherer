const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { promisify } = require('util');
const { writeFile } = require('fs');
const pWriteFile = promisify(writeFile);

const config = {
  extends: 'lighthouse:default',
  passes: [{
    passName: 'Todos Performance',
    gatherers: [
      `todos-gatherer`,
    ],
  }],
  audits: [
    'todos-audit',
  ],
  categories: {
    todos: {
      title: 'Todos metrics',
      description: 'Performance metrics for todos',
      auditRefs: [
      // When we add more custom audits, `weight` controls how they're averaged together.
      {id: 'todos-audit', weight: 1},
    ],
    },
  },
}

async function launchChromeAndRunLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({chromeFlags: opts.chromeFlags});
  opts.port = chrome.port;
  const { lhr, report } = await lighthouse(url, opts, config);
  await chrome.kill()
  return report;
}

const opts = {
  output: 'html'
};

// Usage:
(async () => {
  try {
    const results = await launchChromeAndRunLighthouse('https://izifortune.github.io/lighthouse-custom-gatherer', opts, config);
    await pWriteFile('report.html', results)
  } catch (e) {
    console.log(e);
  }
})();
