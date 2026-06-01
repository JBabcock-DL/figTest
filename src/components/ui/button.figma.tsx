import figma from '@figma/code-connect'
import { Plus } from 'lucide-react'

import { Button } from './button'

figma.connect(
  Button,
  'https://www.figma.com/design/OrDMGL6zOS3U9qYwXvPAvc/handoffTest?node-id=39-926',
  {
    props: {
      variant: figma.enum('variant', {
        default: 'default',
        destructive: 'destructive',
        outline: 'outline',
        secondary: 'secondary',
        ghost: 'ghost',
        link: 'link',
      }),
      size: figma.enum('size', {
        sm: 'sm',
        default: 'default',
        lg: 'lg',
        icon: 'icon',
      }),
      children: figma.string('Label'),
      leadingIcon: figma.boolean('Leading icon', {
        true: <Plus />,
        false: undefined,
      }),
      trailingIcon: figma.boolean('Trailing icon', {
        true: <Plus />,
        false: undefined,
      }),
    },
    example: ({ variant, size, children, leadingIcon, trailingIcon }) => (
      <Button variant={variant} size={size}>
        {leadingIcon}
        {children}
        {trailingIcon}
      </Button>
    ),
  }
)
