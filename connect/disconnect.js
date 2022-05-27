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
            await cache.saveCache([path], telepresenceConfigPath.TELEPRESENCE_CACHE_KEY);
            await toolCache.cacheFile(`${path}/id`, 'id', 'telepresenceID', '1');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceDisconnect();
