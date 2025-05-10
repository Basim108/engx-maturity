# Development

## Local validation
For local validation of json data I recommend using [ajv-cli](https://www.npmjs.com/package/ajv-cli)

For example,
```shell
  ajv validate -s data/schemas/category.schema.json \
      -d data/rules/*.rules.json \
      -r data/schemas/types.schema.json \
      -r data/schemas/rule.schema.json 
```
