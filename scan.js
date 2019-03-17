const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.lhr)
    });
  });
}

const opts = {
};

// Usage:
launchChromeAndRunLighthouse('https://izifortune.github.io/lighthouse-custom-gatherer', opts).then(results => {
  console.log(results);
}).catch(console.log);
