const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const {findDuplicatedEntities, buildDuplicateErrorMessage} = require('./utils/testUtils.js');

const METRIC_FILE_PATTERN = '**/*.metrics.json';
const METRICS_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate metrics uniqueness', () => {

    test('should not have duplicated metric ids', () => {
        // Arrange
        const metricFiles = glob.sync(METRIC_FILE_PATTERN, {cwd: METRICS_FOLDER_PATH});
        const metrics = new Map();
        const duplicatedKeys = new Set();

        // Act
        metricFiles.forEach(file => {
            const fileFullName = path.resolve(METRICS_FOLDER_PATH, file);
            const arrayOfMetrics = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedEntities({
                keyAccessor: x => x.metricId,
                arrayOfEntities: arrayOfMetrics,
                allEntities: metrics,
                duplicatedKeys,
                fileName: fileFullName,
            });
        })

        // Assert
        const errorMsg = buildDuplicateErrorMessage({
            entityName: 'Metric',
            duplicatedKeys,
            allEntities: metrics
        });
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });
})
