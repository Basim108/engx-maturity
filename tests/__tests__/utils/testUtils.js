const glob = require('glob');
const path = require("path");
const fs = require("fs-extra");

function findDuplicatedMetrics({keyAccessor, arrayOfMetrics, metrics, duplicatedKeys, fileName}) {
    arrayOfMetrics.forEach(metric => {
        const key = keyAccessor(metric);
        if (key === undefined)
            return;
        const existedInfo = metrics.get(key)
        if (existedInfo === undefined) {
            metrics.set(key, [{
                fileName,
                rule: metric
            }])
        } else {
            duplicatedKeys.add(key);
            existedInfo.push({
                fileName,
                rule: metric
            })
        }
    })
}

function findDuplicatedRules({keyAccessor, arrayOfRules, ruleIds, duplicatedKeys, fileName}) {
    arrayOfRules.forEach(rule => {
        const key = keyAccessor(rule);
        if (key === undefined)
            return;
        const existedInfo = ruleIds.get(key)
        if (existedInfo === undefined) {
            ruleIds.set(key, [{
                fileName,
                rule
            }])
        } else {
            duplicatedKeys.add(key);
            existedInfo.push({
                fileName,
                rule
            })
        }
    })
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
    findDuplicatedMetrics,
    findDuplicatedRules,
    collectObjects
}