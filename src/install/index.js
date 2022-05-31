const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');
const exec = require('@actions/exec');

const windowsInstall = async function (version) {
    core.setFailed('Not implemented for use with Windows runners');
};

const unixInstall = async function (version) {
    const TELEPRESENCE_PATH = '/opt/telepresence/bin';
    const TELEPRESENCE_DOWNLOAD_URL = process.platform === 'darwin' ?
        `https://app.getambassador.io/download/tel2/darwin/amd64/${version}/telepresence` :
        `https://app.getambassador.io/download/tel2/linux/amd64/${version}/telepresence`;

    const telepresenceBinary = toolCache.find('telepresence', version);

    if (!telepresenceBinary) {
        try {
            await toolCache.downloadTool(TELEPRESENCE_DOWNLOAD_URL, `${TELEPRESENCE_PATH}/telepresence`);
            const cachedPath = await toolCache.cacheDir(`${TELEPRESENCE_PATH}`, 'telepresence', version);
            core.addPath(cachedPath);
        } catch (e) {
            core.setFailed(`There was a problem getting the telepresence binary: ${e}`)
        }
    } else {
        core.addPath(telepresenceBinary);
    }
    await exec.exec("chmod", ['a+x', `${TELEPRESENCE_PATH}/telepresence`]);
};

exports.telepresenceInstall = async function () {
    try {
        const version = core.getInput('version');
        switch (process.platform) {
            case "win32":
                await windowsInstall(version);
                break;
            case "linux":
            case "darwin":
                await unixInstall(version);
                break;
            default:
                core.setFailed("Invalid runner platform");
        }
    } catch (error) {
        core.setFailed(error.message);
    }
};

