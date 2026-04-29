import figma from '@figma/code-connect'
import { Input } from './input'

figma.connect(Input, 'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=485-55', {
  props: {
    placeholder: figma.string('Placeholder'),
  },
  example: ({ placeholder }) => <Input placeholder={placeholder} />,
})
