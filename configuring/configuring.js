const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const getTelepresenceConfigPath = require('../src/path/telepresenceConfigPath');
const installTelepresence = require('../src/install/index');
const cache = require('@actions/cache');
const cacheTool = require('@actions/tool-cache');

const telepresenceConfiguring = async function () {
    //install telepresence
    installTelepresence.telepresenceInstall();
    cacheTool.addPath('/opt/telepresence/bin');

    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();
    const restorePath = [path];

    try {
        await io.mkdirP(path);
        await cache.restoreCache(restorePath, getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY);
    } catch (error) {
        core.warning(`Unable to find the telepresence id: ${error}`);
    }
    try {
        await exec.exec('telepresence', ['version']);
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
        return;
    }
    try {
        const cacheKey = await cache.saveCache(restorePath, getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY);
        if (!cacheKey)
            throw new Error('Unable to save the cache');
    } catch (error) {
        core.warning(error.message);
    }
}


telepresenceConfiguring();
