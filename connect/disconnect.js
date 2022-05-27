const core = require('@actions/core')
const exec = require('@actions/exec');
const telepresenceConfigPath = require('./telepresenceConfigPath');
const cache = require('@actions/cache');
const toolCache = require('@actions/tool-cache');


const telepresenceDisconnect = async function () {
    try {
        await exec.exec('telepresence', ['quit']);
        if (core.getState(telepresenceConfigPath.TELEPRESENCE_ID_STATE) ===
            telepresenceConfigPath.TELEPRESENCE_ID_SAVES) {
            const path = telepresenceConfigPath.getTelepresenceConfigPath();
            const cacheid = await toolCache.cacheFile(`${path}/id`, 'id', 'telepresenceID', '1.0');
            core.info(`Telepresence ID cached with ${cacheid}`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceDisconnect();
