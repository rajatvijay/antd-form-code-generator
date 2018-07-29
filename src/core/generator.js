import prettier from "prettier/standalone";
import plugins from "prettier/parser-babylon";
import { pipe } from "../common/utils";

const formDeclaration = [
  {
    field: "Input",
    label: "E-mail",
    validations: [
      { type: "email", message: "Please type a valid email" },
      { required: "email", message: "Please provide an email" }
    ],
    valuePropName: "userEmail"
  },
  {
    field: "Input",
    label: "Name",
    validations: [{ required: "email", message: "Please provide an email" }],
    valuePropName: "userName"
  }
];

const fieldGenerator = ({ field }) => {
  return `<${field} />`;
};

const generator = declarations => {
  const formItems = declarations.map(d => {
    return `\n{/** ${d.label} Field */}
      <FormItem label="${d.label}" style={${d.styles}}>
        {getFieldDecorator ('${d.valuePropName}', {
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
  );
};

export default wrapper;
