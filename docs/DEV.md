# Development

## Local validation
For local validation of json data I recommend using [ajv-cli](https://www.npmjs.com/package/ajv-cli)

For example,
```shell
  ajv validate -s schemas/category.schema.json \
      -d rules/*.rules.json \
      -r schemas/types.schema.json \
      -r schemas/rule.schema.json 
```
