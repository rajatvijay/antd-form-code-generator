import prettier from "prettier/standalone";
import plugins from "prettier/parser-babylon";
import { pipe } from "../common/utils";

// const formDeclaration = [
//   {
//     field: "Input",
//     label: "E-mail",
//     validations: [
//       { type: "email", message: "Please type a valid email" },
//       { required: "email", message: "Please provide an email" }
//     ],
//     valuePropName: "userEmail"
//   },
//   {
//     field: "Input",
//     label: "Name",
//     validations: [{ required: "email", message: "Please provide an email" }],
//     valuePropName: "userName"
//   }
// ];

/**
 * Validations Notes
 * 1. Required and data type of required fields (type)
 * 2. If optional value are present then their data type needs to be validated (props, options)
 * 3. Options obj has varName as mandatory key
 */

const fieldGenerator = ({ field, label }) => {
  if (typeof field === "object") {
    const { type, props, options } = field;

    const propsStr = props
      ? Object.keys(props) // TODO: This will fail id the props is undefined or not an object
          .map(p => `${p}="${props[p]}"`)
          .join(" ")
      : "";

    if (type === "Select") {
      return `<${type} ${propsStr}>{${
        options.varName
      }.map(o => <Option key={o.${options.reactKey ||
        "id"}} value={o.${options.valueKey || "value"}}>{o.${options.labelKey ||
        "label"}}</Option>)}</${type}>`;
    }

    if (type === "Input") {
      return `<${type} ${propsStr} />`;
    }

    if (type === "Checkbox") {
      return `<${type} ${propsStr}>${label}</${type}>`;
    }
  }
  return `<${field} />`;
};

const generator = declarations => {
  const formItems = declarations.map(d => {
    return `\n{/** ${d.label} Field */}
      <FormItem label="${d.label}" style={${d.styles}}>
        {getFieldDecorator ('${d.valuePropName}', {
          ${d.initialValue ? `initialValue: ${d.initialValue},` : ``}
          rules: ${JSON.stringify(d.validations)},
        }) (${fieldGenerator(d)})}
      </FormItem>`;
  });
  return formItems;
};

const commentWrapper = codeItems =>
  `<React.Fragment>${codeItems.join("\n\n")}</React.Fragment>`;

const formatCode = codeString =>
  prettier.format(codeString, { parser: "babylon", plugins: [plugins] });

const wrapper = declarations => {
  return pipe(
    // [formDeclaration],
    [declarations],
    generator,
    commentWrapper,
    formatCode
  )[0];
};

export default wrapper;
