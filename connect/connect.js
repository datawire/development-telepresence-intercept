const core = require('@actions/core');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const getTelepresenceConfigPath = require('./telepresenceConfigPath');

const artifactClient = artifact.create();
const artifactOptions = {
    createArtifactFolder: true,
};

const telepresenceConnect = async function () {
    const telepresenceIdArtifact = core.getInput("telepresence-id-artifact");
    const path = getTelepresenceConfigPath.getTelepresenceConfigPath();

    await artifactClient.downloadArtifact(telepresenceIdArtifact, path, artifactOptions);

    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceConnect();
