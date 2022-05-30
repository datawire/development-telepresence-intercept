const core = require('@actions/core');
const exec = require('@actions/exec');
const io = require('@actions/io');
const cache = require('@actions/cache');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const telepresenceConnect = async function () {
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();

    try {
        await io.mkdirP(path);
        const cacheid = cache.restoreCache([paths], getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY)
        if (!cacheid)
            throw new Error('Unable to find a telepresence install id stored');
    } catch (error) {
        core.setFailed(error);
    }
    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
