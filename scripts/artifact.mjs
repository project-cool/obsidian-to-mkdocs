import artifact from '@actions/artifact'

const artifactClient = artifact.create()
const artifactName = 'logs';
const files = [
    '/app/code/logs/dev.log',
    '/app/code/logs/errors.log',
]
const rootDirectory = '/app/code/logs'
const options = {
    continueOnError: true
}

const artifactUploadResult = await artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
console.log('Artifact Upload Result', { artifactUploadResult })