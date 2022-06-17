import artifact from "@actions/artifact";
import fs from "fs";
import path from "path";

const artifactClient = artifact.create();
const logArtifactName = "logs";
const logFiles = ["/app/code/logs/dev.log", "/app/code/logs/errors.log"];
const logRootDirectory = "/app/code/logs";
const logOptions = {
  continueOnError: true,
};

const logArtifactUploadResult = await artifactClient.uploadArtifact(
  logArtifactName,
  logFiles,
  logRootDirectory,
  logOptions
);
console.log("Logs Artifact Upload Result", { logArtifactUploadResult });

// Upload converted MD files

const validateFile = (fileName) => {
  if (fileName.startsWith(".")) {
    return false;
  }
  if (fileName === "attachments") {
    return false;
  }
  return true;
};

function* getMarkdownPaths(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (validateFile(file.name)) {
      if (file.isDirectory()) {
        yield* getMarkdownPaths(path.join(dir, file.name));
      } else {
        yield path.join(dir, file.name);
      }
    }
  }
}

const mdArtifactName = "convertedMdFiles";
const mdFiles = [...getMarkdownPaths("/app/docs")];
const mdRootDirectory = "/app/docs/";
const mdOptions = {
  continueOnError: true,
};

const mdArtifactUploadResult = await artifactClient.uploadArtifact(
  mdArtifactName,
  mdFiles,
  mdRootDirectory,
  mdOptions
);
console.log("Converted MD files Artifact Upload Result", {
  mdArtifactUploadResult,
});
