const glob = require('glob');
const path = require("path");
const fs = require("fs-extra");

function findDuplicatedEntities({keyAccessor, arrayOfEntities, allEntities, duplicatedKeys, fileName}) {
    arrayOfEntities.forEach(entity => {
        const key = keyAccessor(entity);
        if (key === undefined)
            return;
        const existedInfo = allEntities.get(key)
        if (existedInfo === undefined) {
            allEntities.set(key, [{
                fileName,
                entity
            }])
        } else {
            duplicatedKeys.add(key);
            existedInfo.push({
                fileName,
                entity
            })
        }
    })

}

function buildDuplicateErrorMessage({entityName, uniquePropertyName, duplicatedKeys, allEntities}){
    let errorMsg = '';
    if (duplicatedKeys.size > 0) {
        const firstDuplicateId = duplicatedKeys.values().next().value;
        const otherFiles = allEntities.get(firstDuplicateId).map(info => info.fileName).join('\n');
        errorMsg = `${entityName} ${uniquePropertyName}: ${firstDuplicateId} is duplicated in the following files:\n${otherFiles}`;
    }
    return errorMsg;
}

/**
 * can be used to traverse all files in a folder and collect all instances of a particular type, for example, metrics, or rules, etc.
 * @param filePattern - glob pattern to match files
 * @param folderPath  - path to folder
 * @param keyAccessor - function to extract value to use it as a key in a map.
 * @param objectName  - name of the object to collect.
 * @returns {Map<any, any>}
 */
function collectObjects(filePattern, folderPath, keyAccessor, objectName) {
    const objectFiles = glob.sync(filePattern, {cwd: folderPath});
    const objects = new Map();
    objectFiles.forEach(file => {
        const fileFullName = path.resolve(folderPath, file);
        const fileObjects = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));
        fileObjects.forEach(x => {
            const resultObject = {
                fileName: fileFullName,
            };
            resultObject[objectName] = x;
            objects.set(keyAccessor(x), resultObject)
        });
    })
    return objects;
}

module.exports = {
    findDuplicatedEntities,
    buildDuplicateErrorMessage,
    collectObjects
}