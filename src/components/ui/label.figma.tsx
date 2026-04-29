import figma from '@figma/code-connect'
import { Label } from './label'

figma.connect(Label, 'https://www.figma.com/design/uCpQaRsW4oiXW3DsC6cLZm?node-id=437-14', {
  props: {
    children: figma.string('Label'),
  },
  example: ({ children }) => <Label>{children}</Label>,
})
