const core = require('@actions/core')
const exec = require('@actions/exec');

try {
    await exec.exec('telepresence', ['logout']);
} catch (error) {
    core.setFailed(error.message);
}
