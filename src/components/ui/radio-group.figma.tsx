import figma from '@figma/code-connect'
import { RadioGroupItem } from './radio-group'

figma.connect(
  RadioGroupItem,
  'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=673-17',
  {
    props: {
      checked: figma.enum('variant', {
        off: false,
        on: true,
      }),
    },
    example: ({ checked }) => (
      <RadioGroupItem value="option-a" checked={checked} />
    ),
  }
)
