const core = require('@actions/core')
const exec = require('@actions/exec');
const telepresenceConfigPath = require('./telepresenceConfigPath');
const cache = require('@actions/cache');


const telepresenceDisconnect = async function () {
    try {
        await exec.exec('telepresence', ['quit']);
        if (core.getState(telepresenceConfigPath.TELEPRESENCE_ID_STATE) ===
            telepresenceConfigPath.TELEPRESENCE_ID_SAVES) {
            await cache.saveCache([telepresenceConfigPath.getTelepresenceConfigPath()],
                telepresenceConfigPath.TELEPRESENCE_CACHE_KEY);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceDisconnect();
