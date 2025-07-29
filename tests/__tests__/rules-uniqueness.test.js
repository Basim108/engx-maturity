const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const {findDuplicatedEntities, buildDuplicateErrorMessage} = require('./utils/testUtils.js');

const RULE_FILE_PATTERN = '**/*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate rules uniqueness', () => {

    let ruleFiles;

    beforeAll(() => {
        ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
    })

    test('should not have duplicated rule ids', () => {
        // Arrange
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.ruleId,
                arrayOfEntities: arrayOfRules,
                allEntities: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Rule',
            uniquePropertyName: 'id',
            duplicatedKeys,
            allEntities: rules
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule questions', () => {
        // Arrange
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.question,
                arrayOfEntities: arrayOfRules,
                allEntities: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Rule',
            uniquePropertyName: 'question',
            duplicatedKeys,
            allEntities: rules
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule statements', () => {
        // Arrange
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.statement,
                arrayOfEntities: arrayOfRules,
                allEntities: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Rule',
            uniquePropertyName: 'statement',
            duplicatedKeys,
            allEntities: rules
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule statements', () => {
        // Arrange
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.statement,
                arrayOfEntities: arrayOfRules,
                allEntities: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Rule',
            uniquePropertyName: 'statement',
            duplicatedKeys,
            allEntities: rules
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });


    test('should not have duplicated rule questions', () => {
        // Arrange
        const rules = new Map();
        const duplicatedKeys = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.question,
                arrayOfEntities: arrayOfRules,
                allEntities: rules,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Rule',
            uniquePropertyName: 'question',
            duplicatedKeys,
            allEntities: rules
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });
})
