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
