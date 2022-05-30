const core = require('@actions/core');
const exec = require('@actions/exec');
const configure = require('../src/configure');

const telepresenceConnect = async function () {
    if (!configure.validateId()) await configure.getConfiguration();
    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
