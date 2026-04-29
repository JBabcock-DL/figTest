import figma from '@figma/code-connect'
import { Button } from './button'

figma.connect(
  Button,
  'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=433-334',
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
    },
    example: ({ variant, size, children }) => (
      <Button variant={variant} size={size}>{children}</Button>
    ),
  }
)
