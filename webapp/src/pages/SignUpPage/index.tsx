import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookie from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { getAllIdeasRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const formSchema = zSignUpTrpcInput.extend({ passwordAgain: z.string().min(1) }).superRefine((values, ctx) => {
  if (values.password !== values.passwordAgain) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['passwordAgain'],
    })
  }
})

type FormValues = z.infer<typeof formSchema>

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const [submitingError, setSubmitingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(formSchema),
    onSubmit: async (values) => {
      try {
        setSubmitingError(null)
        const { token } = await signUp.mutateAsync(values)
        Cookie.set('token', token, { expires: 99900 })
        trpcUtils.invalidate()
        navigate(getAllIdeasRoute())

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmitingError(error.message)
      }
    },
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} maxWidth={500} />
          <Input name="passwordAgain" label="Password again" type="password" formik={formik} maxWidth={500} />
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
          {!!submitingError && <Alert color="red">{submitingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
