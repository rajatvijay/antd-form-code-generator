import prettier from "prettier/standalone";
import plugins from "prettier/parser-babylon";
import { pipe } from "../common/utils";
import { validateSchema } from "./validator";

const fieldGenerator = ({ field, label }) => {
  if (typeof field === "object") {
    const { type, props, options } = field;

    const propsStr = props
      ? Object.keys(props)
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
  const { status: isValid, errors } = validateSchema(declarations);

  let code;
  if (isValid) {
    code = pipe(
      [declarations],
      generator,
      commentWrapper,
      formatCode
    )[0];
  }

  return { isValid, errors, code };
};

export default wrapper;
