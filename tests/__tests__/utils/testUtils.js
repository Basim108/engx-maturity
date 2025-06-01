function findDuplicatedMetrics(info) {
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

module.exports = {
    findDuplicatedMetrics,
    findDuplicatedRules
}