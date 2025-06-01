const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const {findDuplicatedRules} = require('./utils/testUtils.js');

const RULE_FILE_PATTERN = '**/*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate rules uniqueness', () => {

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

    test('should not have duplicated rule questions', () => {
        // Arrange
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedRules({
                keyAccessor: x => x.question,
                arrayOfRules,
                ruleIds: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildErrorMessage(duplicatedKeys, rules);
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule statements', () => {
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
        const errorMsg = buildErrorMessage(duplicatedKeys, rules);
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    function buildErrorMessage(duplicatedKeys, rules) {
        if (duplicatedKeys.size > 0) {
            const firstDuplicateId = duplicatedKeys.values().next().value;
            const otherFiles = rules.get(firstDuplicateId).map(info => info.fileName).join('\n');
            return `Rule title: "${firstDuplicateId}" is duplicated in the following files:\n${otherFiles}`;
        }
        return '';
    }
})
