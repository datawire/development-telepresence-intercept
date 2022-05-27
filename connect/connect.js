const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const cache = require('@actions/cache');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const telepresenceConnect = async function () {
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();
    const restorePath = [path];

    try {
        await io.mkdirP(path);
        const cacheRestored = await cache.restoreCache(restorePath,
            getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY);
        if (!cacheRestored)
            throw new Error('Unable to find a cache stored');
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
