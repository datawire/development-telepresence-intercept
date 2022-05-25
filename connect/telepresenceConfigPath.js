const getTelepresenceConfigPath = () => {
    switch (process.platform) {
        case "darwin":
            return `$HOME/Library/Application\\ Support/telepresence/`;
        case "linux":
            return `$HOME/.config/telepresence/`;
        default:
            core.setFailed(`The platform ${process.platform} is not supported yet`);
            return None;
    }
};
