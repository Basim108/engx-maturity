const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const Ajv = require('ajv');

const RULE_FILE_PATTERN = '*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

const RULE_FILE_AGILE_HEALTH = 'agile-health.rules.json';
const RULE_FILE_WATERFALL = 'waterfall.rules.json';

const SCHEMA_CATEGORY_FILE_PATH = path.resolve(__dirname, '../../data/schemas/category.schema.json');
const SCHEMA_RULES_FILE_PATH = path.resolve(__dirname, '../../data/schemas/rule.schema.json');
const SCHEMA_TYPES_FILE_PATH = path.resolve(__dirname, '../../data/schemas/types.schema.json');

describe('Validate file existence', () => {
    test('agile-health.rules.json should exist', () => {
        const fileAbsPath = path.resolve(RULES_FOLDER_PATH, RULE_FILE_AGILE_HEALTH);
        const fileExists = fs.existsSync(fileAbsPath);
        expect(fileExists, `File does not exists path: ${fileAbsPath}`).toBe(true);
    });

    test('waterfall.rules.json should exist', () => {
        const fileAbsPath = path.resolve(RULES_FOLDER_PATH, RULE_FILE_WATERFALL);
        const fileExists = fs.existsSync(fileAbsPath);
        expect(fileExists, `File does not exists path: ${fileAbsPath}`).toBe(true);
    });

    test('category schema should exist', () => {
        const fileAbsPath = path.resolve(RULES_FOLDER_PATH, SCHEMA_CATEGORY_FILE_PATH);
        const fileExists = fs.existsSync(fileAbsPath);
        expect(fileExists, `File does not exists path: ${fileAbsPath}`).toBe(true);
    });

    test('rule schema should exist', () => {
        const fileAbsPath = path.resolve(RULES_FOLDER_PATH, SCHEMA_RULES_FILE_PATH);
        const fileExists = fs.existsSync(fileAbsPath);
        expect(fileExists, `File does not exists path: ${fileAbsPath}`).toBe(true);
    });

    test('types schema should exist', () => {
        const fileAbsPath = path.resolve(RULES_FOLDER_PATH, SCHEMA_TYPES_FILE_PATH);
        const fileExists = fs.existsSync(fileAbsPath);
        expect(fileExists, `File does not exists path: ${fileAbsPath}`).toBe(true);
    });

    test('all files with rules should match the category schema', () => {
        const categorySchema = JSON.parse(fs.readFileSync(SCHEMA_CATEGORY_FILE_PATH, 'utf8'));
        const rulesSchema = JSON.parse(fs.readFileSync(SCHEMA_RULES_FILE_PATH, 'utf8'));
        const typesSchema = JSON.parse(fs.readFileSync(SCHEMA_TYPES_FILE_PATH, 'utf8'));

        const ajv = new Ajv({allErrors: true, schemas: [rulesSchema, typesSchema]});
        const validator = ajv.compile(categorySchema);

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