import figma from '@figma/code-connect'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from './input'

figma.connect(Input, 'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=485-55', {
  props: {
    label: figma.string('Label'),
    placeholder: figma.string('Placeholder'),
    helper: figma.string('Helper'),
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
  example: ({ label, placeholder, helper, variant, size }) => (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <Input placeholder={placeholder} variant={variant} size={size} />
        <FieldDescription>{helper}</FieldDescription>
      </FieldContent>
    </Field>
  ),
})
