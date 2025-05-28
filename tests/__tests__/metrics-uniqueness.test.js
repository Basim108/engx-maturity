const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const RULE_FILE_PATTERN = '**/*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate metrics uniqueness', () => {

    test('should not have duplicated rule ids', () => {
        // Arrange
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedRules({
                keyAccessor: x => x.ruleId,
                arrayOfRules,
                ruleIds: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        let errorMsg = '';
        if (duplicatedKeys.size > 0) {
            const firstDuplicateId = duplicatedKeys.values().next().value;
            const otherFiles = rules.get(firstDuplicateId).map(info => info.fileName).join('\n');
            errorMsg = `RuleId: ${firstDuplicateId} is duplicated in the following files:\n${otherFiles}`;
        }
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule titles', () => {
        // Arrange
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedRules({
                keyAccessor: x => x.statement,
                arrayOfRules,
                ruleIds: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        let errorMsg = '';
        if (duplicatedKeys.size > 0) {
            const firstDuplicateId = duplicatedKeys.values().next().value;
            const otherFiles = rules.get(firstDuplicateId).map(info => info.fileName).join('\n');
            errorMsg = `Rule title: "${firstDuplicateId}" is duplicated in the following files:\n${otherFiles}`;
        }
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    // TODO: check that there is no related metrics that where not presented in any of **/*.metrics.json files
    // TODO: check that there is no metric that has duplicates in articles.url, articles.title, metricId

    function findDuplicatedRules(info) {
        const {keyAccessor, arrayOfRules, ruleIds, duplicatedKeys, fileName} = info;
        arrayOfRules.forEach(rule => {
            const key = keyAccessor(rule);
            if(key === undefined)
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
})
