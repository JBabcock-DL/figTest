import figma from '@figma/code-connect'
import { Checkbox } from './checkbox'

figma.connect(Checkbox, 'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=571-13', {
  props: {
    checked: figma.enum('variant', {
      off: false,
      on: true,
    }),
  },
  example: ({ checked }) => <Checkbox checked={checked} />,
})
