const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const Ajv = require('ajv');

const RULE_FILE_PATTERN = '**/*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

const SCHEMA_ARRAY_OF_RULES_FILE_PATH = path.resolve(__dirname, '../../data/schemas/arrayOfRules.schema.json');
const SCHEMA_RULES_FILE_PATH = path.resolve(__dirname, '../../data/schemas/rule.schema.json');
const SCHEMA_TYPES_FILE_PATH = path.resolve(__dirname, '../../data/schemas/types.schema.json');

describe('Validate rule files', () => {

    test('should match the rule schema', () => {
        const arrayOfRulesSchema = JSON.parse(fs.readFileSync(SCHEMA_ARRAY_OF_RULES_FILE_PATH, 'utf8'));
        const rulesSchema = JSON.parse(fs.readFileSync(SCHEMA_RULES_FILE_PATH, 'utf8'));
        const typesSchema = JSON.parse(fs.readFileSync(SCHEMA_TYPES_FILE_PATH, 'utf8'));

        const ajv = new Ajv({allErrors: true, schemas: [rulesSchema, typesSchema]});
        const validator = ajv.compile(arrayOfRulesSchema);

        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});

        ruleFiles.forEach(file => {
            // Arrange
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const content = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            // Act
            const isValid = validator(content);

            // Assert
            const validationErrors = isValid || validator.errors.map(x => `${x.instancePath}: ${x.message}, schemaPath: ${x.schemaPath}`).join('\n');
            expect(isValid, `File ${file} is not valid \n${validationErrors}`).toBe(true);
        })
    });
});