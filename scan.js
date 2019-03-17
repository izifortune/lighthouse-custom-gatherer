const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const config = {

}

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
launchChromeAndRunLighthouse('https://example.com', opts, config).then(results => {
  console.log(results);
});
