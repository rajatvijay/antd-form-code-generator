import Ajv from "ajv";

// TODO: Break the validator in parts using the dependency keyword
const VALIDATOR_SCHEMA = {
  type: "array",
  title: "Antd form code schema",
  description: "Schema to generate antd lib specific form code",
  minItems: 1,
  items: {
    type: "object",
    properties: {
      field: {
        if: { type: "string" },
        then: { enum: ["Input"] },
        else: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["Select", "Input", "Checkbox"]
            },
            props: {
              type: "object",
              patternProperties: {
                "[sS]*": {
                  anyOf: [{ type: "string" }, { type: "number" }]
                }
              }
            },
            options: {
              type: "object",
              properties: {
                varName: {
                  type: "string"
                },
                labelKey: {
                  type: "string"
                },
                valueKey: {
                  type: "string"
                }
              },
              required: ["varName"]
            }
          },
          required: ["type"]
        }
      },
      label: {
        type: "string"
      },
      validations: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            message: { type: "string" },
            enums: { type: "string" },
            len: { type: "number" },
            max: { type: "number" },
            min: { type: "number" },
            pattern: { type: "string" },
            required: { type: "boolean" },
            type: {
              type: "string",
              enum: [
                "string",
                "number",
                "boolean",
                "method",
                "regexp",
                "integer",
                "float",
                "array",
                "object",
                "enum",
                "date",
                "url",
                "hex",
                "email"
              ]
            }
          },
          required: ["message"]
        }
      },
      valuePropName: {
        type: "string"
      }
    },
    required: ["field", "label", "valuePropName"]
  }
};

export const validateSchema = data => {
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(VALIDATOR_SCHEMA);
  const isValid = validate(data);

  let returnVal;
  if (!isValid) {
    returnVal = {
      status: false,
      errors: validate.errors
    };
  } else {
    returnVal = {
      status: true
    };
  }

  return returnVal;
};
