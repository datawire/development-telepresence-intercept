const core = require('@actions/core')
const exec = require('@actions/exec');
const secrets = require('../src/secrets/index');
const telepresenceConfigPath = require('./telepresenceConfigPath');
const fs = require('fs');



const telepresenceDisconnect = async function () {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const repository = core.getInput('github-repository');
        const repoData = repository.split('/');
        await exec.exec('telepresence', ['quit']);
        if (core.getState(secrets.TELEPRESENCE_ID_STATE) === secrets.SAVES_TELEPRESENCE_ID) {
            try {
                const telepresenceID = fs.readFileSync(`${telepresenceConfigPath.getTelepresenceConfigPath()}/id`, 'utf8');
                secrets.setTelepresenceID(githubToken, repoData[1], repoData[0], telepresenceID);
                core.saveState(secrets.TELEPRESENCE_ID_STATE, secrets.SAVED_TELEPRESENCE_ID);
            } catch (err) {
                core.setFailed(err);
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceDisconnect();
