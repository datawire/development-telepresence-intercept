const core = require('@actions/core');
const cache = require('@actions/cache');
const io = require('@actions/io');
const getTelepresenceConfigPath = require('../path/telepresenceConfigPath');

const VALIDATE_ID_STATE = 'validated-telepresence-id';
const VALIDATED_ID = 'validated';

const getConfiguration = async () => {
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();
    try {
        await io.mkdirP(path);
        const cacheid = await cache.restoreCache([path], getTelepresenceConfigPath.TELEPRESENCE_CACHE_KEY,)
        if (!cacheid)
            throw new Error('Unable to find a telepresence install id stored');
        core.saveState(VALIDATE_ID_STATE, VALIDATED_ID);
    } catch (error) {
        core.setFailed(error);
    }
};

const validateId = async () => {
    const isValidated = core.getState(VALIDATE_ID_STATE);
    return isValidated === VALIDATED_ID;
}

exports.validateId = validateId;
exports.getConfiguration = getConfiguration;
