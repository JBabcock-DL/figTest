import figma from '@figma/code-connect'
import { Input } from './input'

figma.connect(Input, 'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=485-55', {
  props: {
    placeholder: figma.string('Placeholder'),
    variant: figma.enum('variant', {
      default: 'default',
      invalid: 'invalid',
      disabled: 'disabled',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      default: 'default',
      lg: 'lg',
    }),
  },
  example: ({ placeholder, variant, size }) => (
    <Input placeholder={placeholder} variant={variant} size={size} />
  ),
})
