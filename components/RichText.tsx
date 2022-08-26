import type { RichTextEditorProps } from '@mantine/rte'
import useInputStyles from 'styles/useInputStyles'

import dynamic from 'next/dynamic'
import { createStyles } from '@mantine/core'
const ImpotEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
})

const useStyles = createStyles((theme) => ({
  input: {
    border: 0,
    '.ql-editor': {
      minHeight: 200,
    },
  },
}))

const RichText = (props: RichTextEditorProps) => {
  const { classes, cx } = useInputStyles()
  const { classes: cls } = useStyles()

  return (
    <ImpotEditor
      {...props}
      controls={[
        ['bold', 'italic', 'underline', 'strike', 'clean'],
        ['h1', 'h2', 'h3'],
        ['unorderedList', 'orderedList'],
        ['link', 'image', 'blockquote', 'code'],
        ['alignLeft', 'alignCenter', 'alignRight'],
        ['sup', 'sub'],
      ]}
      radius={9}
      classNames={{
        root: cx(classes.input2bg, cls.input),
        toolbar: classes.input2bg,
      }}
      styles={(theme) => ({
        toolbar: {
          borderColor:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[8]
              : theme.colors.gray[3],
        },
      })}
    />
  )
}
export default RichText
