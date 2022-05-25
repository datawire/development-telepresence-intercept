const core = require('@actions/core')
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const files = ['id', 'config.yaml'];
const artifactClient = artifact.create();
const artifactOptions = {
    continueOnError: true
}

const telepresenceDisconnect = async function () {
    const telepresenceConfigPath = getTelepresenceConfigPath.getTelepresenceConfigPath();
    const telepresenceIdArtifact = core.getInput("telepresence-id-artifact");

    const uploadResponse = await artifactClient.uploadArtifact(telepresenceIdArtifact, files, telepresenceConfigPath, artifactOptions);
    uploadResponse.failedItems.forEach(itemFailed => {
        core.warning(`It was not possible to save the file: ${itemFailed}`);
    });

    try {
        await exec.exec('telepresence', ['quit']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceDisconnect();
