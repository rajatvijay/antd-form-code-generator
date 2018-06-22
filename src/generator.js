import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-babylon';

const formDeclaration = [
  {
    field: 'Input',
    label: 'E-mail',
    validations: [
      {type: 'email', message: 'Please type a valid email'},
      {required: 'email', message: 'Please provide an email'},
    ],
    value: 'userEmail',
  },
  {
    field: 'Input',
    label: 'Name',
    validations: [{required: 'email', message: 'Please provide an email'}],
    value: 'userName',
  },
];

export const generator = declarations => {
  const formItems = declarations.map (
    d =>
      `\n{/** ${d.label} Field */}
      <FormItem label="${d.label}" style={${d.styles}}>
        {getFieldDecorator ('${d.value}', {
          rules: ${JSON.stringify (d.validations)},
        }) (<${d.field} />)}
      </FormItem>`
  );
  return formItems;
};

const commentWrapper = codeItems =>
  `<React.Fragment>${codeItems.join ('\n\n')}</React.Fragment>`;

const formatCode = codeString =>
  prettier.format (codeString, {parser: 'babylon', plugins: [plugins]});

const wrapper = declarations =>
  formatCode (commentWrapper (generator (formDeclaration)));

export default wrapper;
