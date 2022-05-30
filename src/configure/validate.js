const core = require('@actions/core');


const VALIDATE_ID_STATE = 'validated-telepresence-id';

const validateId = () => {
    const isValidated = core.getState(VALIDATE_ID_STATE);
    if (isValidated)
        return true;
}

exports.validateId = validateId;
