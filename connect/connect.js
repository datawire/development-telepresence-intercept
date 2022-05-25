const core = require('@actions/core');
const io = require('@actions/io');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const artifactClient = artifact.create();
const artifactOptions = {
    createArtifactFolder: false,
};
const artifactOptionsUpload = {
    continueOnError: true
}

const telepresenceConnect = async function () {
    const telepresenceIdArtifact = core.getInput("telepresence-id-artifact");
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();

    try {
        await io.mkdirP(path);
        await artifactClient.downloadArtifact(telepresenceIdArtifact, path, artifactOptions);
    } catch (error) {
        core.warning("Unable to find any artifact associated to this workflow");
    }

    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }

    const files = [`/home/runner/.config/telepresence/id`];
    const uploadResponse = await artifactClient.uploadArtifact(telepresenceIdArtifact, files, '/home/runner/.config/telepresence', artifactOptionsUpload);
    uploadResponse.failedItems.forEach(itemFailed => {
        core.warning(`It was not possible to save the file: ${itemFailed}`);
    });

}


telepresenceConnect();
