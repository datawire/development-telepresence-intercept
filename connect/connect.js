const core = require('@actions/core');
const io = require('@actions/io');
const exec = require('@actions/exec');
const artifact = require('@actions/artifact');
const secrets = require('../src/secrets/index');
const fs = require('fs');
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
        const telepresenceIDSecret = input.getInput('telepresence-id');
        if (!telepresenceIDSecret || telepresenceIDSecret === '') {
            core.saveState(secrets.TELEPRESENCE_ID_STATE, secrets.SAVES_TELEPRESENCE_ID);
            core.warning('Unable to get a previous telepresence id.');
        } else {
            try {
                fs.writeFileSync(`${path}/id`, telepresenceIDSecret);
            } catch (err) {
                core.warning(err);
            }
        }
    }

    try {
        await exec.exec('telepresence', ['connect']);
    } catch (error) {
        core.setFailed(error.message);
    }

    const files = [`${path}/id`];
    const uploadResponse = await artifactClient.uploadArtifact(telepresenceIdArtifact, files, path, artifactOptionsUpload);
    uploadResponse.failedItems.forEach(itemFailed => {
        core.warning(`It was not possible to save the file: ${itemFailed}`);
    });
}


telepresenceConnect();
