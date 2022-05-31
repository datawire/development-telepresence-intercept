exports.getTelepresenceConfigPath = () => {
    switch (process.platform) {
        case "darwin":
            return `/home/runner/Library/Application\\ Support/telepresence`;
        case "linux":
            return `/home/runner/.config/telepresence`;
        default:
            core.setFailed(`The platform ${process.platform} is not supported yet`);
            return None;
    }
};

exports.TELEPRESENCE_ID_STATE = 'telepresence-id-state';
exports.TELEPRESENCE_ID_SAVES = 'telepresence-saves';
exports.TELEPRESENCE_ID_SAVED = 'telepresence-saved';
exports.TELEPRESENCE_CACHE_KEY = 'telepresence_cache_key_3';

