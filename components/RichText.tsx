import type { RichTextEditorProps } from '@mantine/rte'
import useInputStyles from 'styles/useInputStyles'

import dynamic from 'next/dynamic'
import { createStyles, Text } from '@mantine/core'
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
  hasError: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.red,
  },
}))

interface Props {
  error: string | undefined
}

const RichText = (props: RichTextEditorProps & Props) => {
  const { classes, cx } = useInputStyles()
  const { classes: cls } = useStyles()

  return (
    <div>
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
          root: cx(classes.inputBg, cls.input, {
            [cls.hasError]: !!props.error,
          }),
          toolbar: classes.inputBg,
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
      {props.error && (
        <Text color='red' size='sm' mt={3}>
          {props.error}
        </Text>
      )}
    </div>
  )
}
export default RichText
