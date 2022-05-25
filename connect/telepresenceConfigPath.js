exports.getTelepresenceConfigPath = () => {
    switch (process.platform) {
        case "darwin":
            return `~/Library/Application\\ Support/telepresence/`;
        case "linux":
            return `~/.config/telepresence/`;
        default:
            core.setFailed(`The platform ${process.platform} is not supported yet`);
            return None;
    }
};
