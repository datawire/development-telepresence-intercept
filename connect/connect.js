const core = require('@actions/core');
const io = require('@actions/io');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const artifactClient = artifact.create();
const artifactOptions = {
    createArtifactFolder: true,
};
const artifactOptionsUpload = {
    continueOnError: true
}

const telepresenceConnect = async function () {
    const telepresenceIdArtifact = core.getInput("telepresence-id-artifact");
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();

    try {
        await artifactClient.downloadArtifact(telepresenceIdArtifact, path, artifactOptions);
    } catch (error) {
        await io.mkdirP(path);
        core.warning("Unable to find any artifact associated to this workflow");
    }

    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }

    const files = [`${telepresenceConfigPath}/id`];
    const uploadResponse = await artifactClient.uploadArtifact(telepresenceIdArtifact, files, path, artifactOptionsUpload);
    uploadResponse.failedItems.forEach(itemFailed => {
        core.warning(`It was not possible to save the file: ${itemFailed}`);
    });

}


telepresenceConnect();
