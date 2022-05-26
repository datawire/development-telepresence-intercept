const github = require('@actions/github');
const toolCache = require('@actions/tool-cache');

const PAGE_SIZE = 100;

exports.getRepositoryArtifacts = async (artifactName, githubToken, repoName, repoOwner) => {
    let pageNumber = 0;
    const octokit = github.getOctokit(githubToken);

    const artifacts = [];

    let response = await octokit.rest.actions.listArtifactsForRepo({owner: repoOwner, repo: repoName, per_page: PAGE_SIZE, page: pageNumber});

    artifacts.concat(response.artifacts);

    while (response.total_count >= PAGE_SIZE) {
        pageNumber++;
        esponse = await octokit.rest.actions.listArtifactsForRepo({owner: repoOwner, repo: repoName, per_page: PAGE_SIZE, page: pageNumber});
        artifacts.concat(response.artifacts);
    }

    const artifactToDownload = artifacts?.filter(artifact => artifact.name === artifactName)?.sort
        ((artifactA, artifactB) => {
            const dateA = new Date(artifactA.updated_at);
            const dateB = new Date(artifactB.updated_at);
            return dateA.getTime() < dateB.getTime();
        })?.at(0);
    response = await octokit.rest.actions.downloadArtifact({owner: repoOwner, repo: repoName, artifact_id: artifactToDownload.id, archive_format: 'zip'});
    const location = response.Headers.Location;
    toolCache.downloadTool(location, '');
    toolCache.extractZip('', '');
};
