const github = require('@actions/github');
const sodium = require('tweetsodium');
const {v4: uuidv4} = require('uuid');

const TELEPRESENCE_ID = 'TELEPRESENCE_ID_ACTION';

exports.setTelepresenceID = async (githubToken, repoName, repoOwner, telepresenceID) => {
    const key = uuidv4();
    const messageBytes = Buffer.from(telepresenceID);
    const keyBytes = Buffer.from(key);

    const encryptedBytes = sodium.seal(messageBytes, keyBytes);

    const encrypted = Buffer.from(encryptedBytes).toString('base64');

    const octokit = github.getOctokit(githubToken);
    const response = await octokit.rest.actions.createOrUpdateRepoSecret({owner: repoOwner, repo: repoName, secret_name: TELEPRESENCE_ID, encrypted_value: encrypted, key_id: key});
    return response.status === 201;
};

exports.TELEPRESENCE_ID_STATE = 'telepresenceID';
exports.SAVES_TELEPRESENCE_ID = 'saves';
exports.SAVED_TELEPRESENCE_ID = 'saved';
