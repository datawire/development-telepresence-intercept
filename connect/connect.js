const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const toolCache = require('@actions/tool-cache');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const telepresenceConnect = async function () {
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();
    const restorePath = [path];

    try {
        await io.mkdirP(path);
        const telepresenceID = toolCache.find('telepresenceID', '1.0');
        if (!telepresenceID)
            throw new Error('Unable to find a telepresence install id stored');
    } catch (error) {
        core.saveState(getTelepresenceConfigPath.TELEPRESENCE_ID_STATE,
            getTelepresenceConfigPath.TELEPRESENCE_ID_SAVES);
        core.warning(`Unable to find the telepresence id: ${error}`);
    }
    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
