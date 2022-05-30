const cache = require('@actions/cache');
const core = require('@actions/core');
const io = require('@actions/io');
const getTelepresenceConfigPath = require('../path/telepresenceConfigPath');

const getConfiguration = () => {
    try {
        await io.mkdirP(path);
        const cacheid = await cache.restoreCache([path], getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY,)
        if (!cacheid)
            throw new Error('Unable to find a telepresence install id stored');
        core.se
    } catch (error) {
        core.setFailed(error);
    }
};

exports.getConfiguration = getConfiguration;
