import { zCreateIdeaTrpcInput } from '@ideanick/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { useState } from 'react'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { TextArea } from '../../components/TextArea'
import { trpc } from '../../lib/trpc'

const schema = zCreateIdeaTrpcInput

type FormValues = z.infer<typeof schema>

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submitingError, setSubmitingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: (values) => {
      const result = schema.safeParse(values)
      if (result.success) {
        return {}
      }
      return result.error.issues.reduce(
        (acc, issue) => {
          const key = issue.path[0] as string
          acc[key] = issue.message
          return acc
        },
        {} as Record<string, string>
      )
    },
    onSubmit: async (values) => {
      setSubmitingError(null)
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmitingError(error.message)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} maxWidth={500} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submitingError && <Alert color="red">{submitingError}</Alert>}
        {successMessageVisible && <Alert color="green">Idea created successfully!</Alert>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  )
}
