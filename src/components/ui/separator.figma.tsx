import figma from '@figma/code-connect'
import { Separator } from './separator'

figma.connect(
  Separator,
  'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=438-12',
  {
    props: {
      orientation: figma.enum('variant', {
        horizontal: 'horizontal',
        vertical: 'vertical',
      }),
    },
    example: ({ orientation }) => <Separator orientation={orientation} />,
  }
)
