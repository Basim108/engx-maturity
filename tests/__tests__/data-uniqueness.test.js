const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const RULE_FILE_PATTERN = '*.rules.json';
const RULES_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate uniqueness', () => {

    test('should not have duplicated rule ids', () => {
        // Arrange
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
        const rules = new Map();
        const duplicates = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const category = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            traverseCategoryForRules({
                keyAccessor: x => x.ruleId,
                category,
                ruleIds: rules,
                duplicateIds: duplicates,
                categoryPath: `/${category.categoryId}`
            });
        })

        // Assert
        let errorMsg = '';
        if (duplicates.size > 0) {
            const firstDuplicateId = duplicates.values().next().value;
            const otherCategories = rules.get(firstDuplicateId).map(info => info.categoryPath).join('\n');
            errorMsg = `RuleId ${firstDuplicateId} is duplicated in the following categories:\n${otherCategories}`;
        }
        expect(duplicates.size, errorMsg).toBe(0);
    });

    test('should not have duplicated rule titles', () => {
        // Arrange
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});
        const rules = new Map();
        const duplicates = new Set();

        // Act
        ruleFiles.forEach(file => {
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const category = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            traverseCategoryForRules({
                keyAccessor: x => x.title,
                category,
                ruleIds: rules,
                duplicateIds: duplicates,
                categoryPath: `/${category.categoryId}`
            });
        })

        // Assert
        let errorMsg = '';
        if (duplicates.size > 0) {
            const firstDuplicateId = duplicates.values().next().value;
            const otherCategories = rules.get(firstDuplicateId).map(info => info.categoryPath).join('\n');
            errorMsg = `Rule title: ${firstDuplicateId} is duplicated in the following categories:\n${otherCategories}`;
        }
        expect(duplicates.size, errorMsg).toBe(0);
    });

    test('should not have duplicated category ids within one file', () => {
        const ruleFiles = glob.sync(RULE_FILE_PATTERN, {cwd: RULES_FOLDER_PATH});

        ruleFiles.forEach(file => {
            // Arrange
            const fileFullName = path.resolve(RULES_FOLDER_PATH, file);
            const category = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));
            const categories = new Map();
            const duplicates = new Set();

            // Act
            traverseCategoryForCategories({
                keyAccessor: x => x.categoryId,
                category,
                categoryIds: categories,
                duplicateIds: duplicates,
                categoryPath: `/${category.categoryId}`
            });

            // Assert
            let errorMsg = '';
            if (duplicates.size > 0) {
                const firstDuplicateId = duplicates.values().next().value;
                const otherCategories = categories.get(firstDuplicateId).map(info => info.categoryPath).join('\n');
                errorMsg = `CategoryId ${firstDuplicateId} is duplicated in the following paths:\n${otherCategories}`;
            }
            expect(duplicates.size, errorMsg).toBe(0);
        })
    });

    function traverseCategoryForRules(info) {
        const {keyAccessor, category, ruleIds, duplicateIds, categoryPath} = info;
        if (category.rules) {
            category.rules.forEach(rule => {
                const key = keyAccessor(rule);
                const existedInfo = ruleIds.get(key)
                if (existedInfo === undefined) {
                    ruleIds.set(key, [{
                        categoryPath,
                        rule
                    }])
                } else {
                    duplicateIds.add(key);
                    existedInfo.push({
                        categoryPath,
                        rule
                    })
                }
            })
        }
        if (category.children) {
            category.children.forEach(child => traverseCategoryForRules({
                keyAccessor,
                category: child,
                ruleIds,
                duplicateIds,
                categoryPath: `${categoryPath}/${child.categoryId}`
            }))
        }
    }

    function traverseCategoryForCategories(info) {
        const {keyAccessor, category, categoryIds, duplicateIds, categoryPath} = info;

        const key = keyAccessor(category);
        const existedInfo = categoryIds.get(key)
        if (existedInfo === undefined) {
            categoryIds.set(key, [{
                categoryPath,
                category
            }])
        } else {
            duplicateIds.add(key);
            existedInfo.push({
                categoryPath,
                category
            })
        }

        if (category.children) {
            category.children.forEach(child => traverseCategoryForCategories({
                keyAccessor,
                category: child,
                categoryIds,
                duplicateIds,
                categoryPath: `${categoryPath}/${child.categoryId}`
            }))
        }
    }
})
;