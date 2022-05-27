const core = require('@actions/core');
const exec = require('@actions/exec');
const secrets = require('../src/secrets/index');
const fs = require('fs');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const telepresenceConnect = async function () {
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();
    const telepresenceID = core.getInput('telepresence-id');
    if (!telepresenceID || telepresenceID === '') {
        core.saveState(secrets.TELEPRESENCE_ID_STATE, secrets.SAVES_TELEPRESENCE_ID);
        core.warning('Unable to get a previous telepresence id.');
    } else {
        try {
            fs.writeFileSync(`${path}/id`, telepresenceIDSecret);
        } catch (err) {
            core.warning(err);
        }
    }

    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
