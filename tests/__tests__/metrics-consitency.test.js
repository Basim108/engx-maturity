const path = require('path');
const {collectObjects} = require("./utils/testUtils");

const METRIC_FILE_PATTERN = '**/*.metrics.json';
const METRICS_FOLDER_PATH = path.resolve(__dirname, '../../data/rules/');

describe('Validate metrics consistency', () => {
    let allMetricIds;

    beforeAll(() => {
        allMetricIds = collectObjects(METRIC_FILE_PATTERN, METRICS_FOLDER_PATH, x => x.metricId, 'metric');
    })

    test('should not have references to metrics that does not presented in any file', () => {
        // Arrange
        const notExistedMetricIds = new Map();
        allMetricIds.values().forEach(metric => {
            if (metric.related === undefined || metric.related.length === 0)
                return;
            const notReferencedIds = metric.related.filter(relatedMetricId => allMetricIds.get(relatedMetricId) === undefined);
            if (notReferencedIds.length > 0)
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

    test('given leads-to or impacts reference should have affected-by relation in the reversed metric', () => {
        // Arrange
        const wrongRelations = findWrongReverseRelations(["leads-to", "impacts"], ["affected-by"]);

        // Assert
        const errorMsg = buildWrongReverseRelationErrorMessage(wrongRelations);
        expect(wrongRelations.length, errorMsg).toBe(0);
    });

    test('given affected-by reference should have leads-to or impacts relation in the reversed metric', () => {
        // Arrange
        const wrongRelations = findWrongReverseRelations(["affected-by"], ["leads-to", "impacts"]);

        // Assert
        const errorMsg = buildWrongReverseRelationErrorMessage(wrongRelations);
        expect(wrongRelations.length, errorMsg).toBe(0);
    });

    function findWrongReverseRelations(referenceRelations, expectedReversedRelations) {
        const wrongRelations = [];
        allMetricIds.values().forEach(metricInfo => {
            const metric = metricInfo.metric;
            if (metric.related === undefined || metric.related.length === 0)
                return;
            metric.related
                  .filter(relatedMetric => referenceRelations.includes(relatedMetric.relation))
                  .forEach(mainReference => {
                      const metric = metricInfo.metric;
                      const relatedMetric = allMetricIds.get(mainReference.metricId);
                      expect(relatedMetric).not.toBeUndefined();
                      let errorMsg = `Metric ${relatedMetric.metric.metricId} in file "${relatedMetric.fileName}" has no related metrics, but expected to have ${metric.metricId} with one of these relations: ${expectedReversedRelations.join(', ')}`;
                      expect(relatedMetric.metric.related, errorMsg).not.toBeUndefined();
                      expect(relatedMetric.metric.related.length).toBeGreaterThan(0);
                      const reverseRelated = relatedMetric.metric.related.find(x => x.metricId === metric.metricId);
                      expect(reverseRelated).not.toBeUndefined();
                      const doesNotHaveReversedRelation = expectedReversedRelations.indexOf(reverseRelated.relation) === -1;
                      if (doesNotHaveReversedRelation) {
                          wrongRelations.push({
                              mainMetric: {
                                  metricId: metric.metricId,
                                  fileName: metricInfo.fileName,
                              },
                              relatedMetric: {
                                  metricId: relatedMetric.metric.metricId,
                                  fileName: relatedMetric.fileName
                              }
                          });
                      }
                  });
        });
        return wrongRelations;
    }

    function buildWrongReverseRelationErrorMessage(wrongRelations, errorMsg) {
        if (wrongRelations.length > 0) {
            errorMsg = wrongRelations.map(pair => `${pair.relatedMetric.metricId} in file ${pair.relatedMetric.fileName} must have "affected-by" relation. Main metric ${pair.mainMetric.metricId}, from file ${pair.mainMetric.fileName}`)
                                     .join('\n');
        }
        return errorMsg;
    }
})
