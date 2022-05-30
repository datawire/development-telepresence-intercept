const core = require('@actions/core');
const exec = require('@actions/exec');
const configure = require('../src/configure');

const telepresenceConnect = async function () {
    !configure.validateId() && configure.getConfiguration();
    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
