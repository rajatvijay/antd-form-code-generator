### Live link
[Play here](http://antd-form.surge.sh/)

### Philosophy
antd-form-code-generator is a code generator using JSON schemas. This tool is not intended to be used inside a project’s code to generate form at runtime, rather at development time to automate form code generation for long forms.

Using it at the development time rather than runtime, gives you the ability to give the form a custom UI layout and stylings. It’s main power lies in its ablility to make updates to the code using  just the schema which gives you more visibility on the changes and gain more confidence on the code for the repeated and frequent changes.

The code generated is very specific to the antd library. If your project is not using antd as your UI library, this tool might not be for that project.

The tool doesnt generate a form component rather just the fields inside a `<React.Fragment>` which can be simply pasted inside the `<Form>` tag. This gives you the ability to provide any other props such as submit handler or `className`

It also gives you the ability to focus on the fields rather than the form component as a whole. One another benefit this approach provides is: you can divide the fields of a very long form into small logical components using the tool itself so, you focus on small peices of code rather than the big form component.

The main purpose to build this tool is to avoid writing the same form code again and again in a project where a lot of forms are required. Also in case of the updation of these forms, you only have to focus on updating the JSON schema which is less cumbersome as compared to the form code iteself, thus reducing the chances of error in every update.

### JSON schema
```json
[
  {
    "field": {
      "type": "Select",
      "props": {},
      "options": {
        "varName": "genders",
        "labelKey": "label",
        "valueKey": "value"
      }
    },
    "label": "E-mail",
    "validations": [
      {
        "type": "email",
        "message": "Please type a valid email"
      },
      {
        "required": true,
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userEmail"
  },
  {
    "field": {
      "type": "Checkbox",
      "props": {}
    },
    "label": "E-mail",
    "validations": [
      {
        "type": "email",
        "message": "Please type a valid email"
      },
      {
        "required": true,
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userEmail"
  },
  {
    "field": "Input",
    "label": "Name",
    "validations": [
      {
        "required": true,
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userName"
  },
  {
    "field": {
      "type": "Input",
      "props": {
        "prefix": "$"
      }
    },
    "label": "Name",
    "validations": [
      {
        "required": true,
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userName"
  }
]
```


### JSON schema validator config
You can look at the config for JSON validator [here](http://jsoneditoronline.org/?id=4b6df9ceb3c348aa93debf3780405a7e)

### Have and issues? Want a new feature?
In case of any bugor feature request, feel free to create a issue in the repo.

### Contributing
This project is bootstrapped using create-react-app so, you can simple clone it and follow:

1. `yarn` => To install dependencies
2. `yarn start` => To start the dev server
