const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

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
            const arrayOfRules = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));

            findDuplicatedRules({
                keyAccessor: x => x.metricId,
                arrayOfRules,
                ruleIds: metrics,
                duplicatedKeys,
                fileName: fileFullName
            });
        })

        // Assert
        let errorMsg = '';
        if (duplicatedKeys.size > 0) {
            const firstDuplicateId = duplicatedKeys.values().next().value;
            const otherFiles = metrics.get(firstDuplicateId).map(info => info.fileName).join('\n');
            errorMsg = `RuleId: ${firstDuplicateId} is duplicated in the following files:\n${otherFiles}`;
        }
        expect(duplicatedKeys.size, errorMsg).toBe(0);
    });

    test('should not have references to metrics that does not presented in any file', () => {
        // Arrange
        const metricFiles = glob.sync(METRIC_FILE_PATTERN, {cwd: METRICS_FOLDER_PATH});
        const allMetricIds = new Map();
        const notExistedMetricIds = new Map();
        metricFiles.forEach(file => {
            const fileFullName = path.resolve(METRICS_FOLDER_PATH, file);
            const fileMetrics = JSON.parse(fs.readFileSync(fileFullName, 'utf8'));
            fileMetrics.forEach(x => allMetricIds.set(x.metricId, x));
        })
        allMetricIds.values().forEach(metric => {
            if(metric.related === undefined || metric.related.length === 0)
                return;
            const notReferencedIds = metric.related.filter(relatedMetricId => allMetricIds.get(relatedMetricId) === undefined);
            if(notReferencedIds.length > 0)
                notExistedMetricIds.set(metric.metricId, notReferencedIds);
        })

        // Assert
        let errorMsg = '';
        if (notExistedMetricIds.size > 0) {
            const hostMetricId = notExistedMetricIds.keys().next().value;
            const relatedMetricIds = notExistedMetricIds.get(hostMetricId).join(', ');
            errorMsg = `Metric "${hostMetricId}" has related ids that are not defined in any of metric files: ${relatedMetricIds}`;
        }
        expect(notExistedMetricIds.size, errorMsg).toBe(0);
    });

    function findDuplicatedRules(info) {
        const {keyAccessor, arrayOfRules, ruleIds, duplicatedKeys, fileName} = info;
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
})
