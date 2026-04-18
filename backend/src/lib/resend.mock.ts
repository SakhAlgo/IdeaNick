import { type sendEmailThroughResend } from './resend'

jest.mock('./resend', () => {
  const original = jest.requireActual('./resend')
  const mockedSendEmailThroughResend: typeof sendEmailThroughResend = jest.fn(async () => {
    return {
      loggableResponse: {
        status: 200,
        statusText: 'OK',
        data: { message: 'Mocked' },
      },
    }
  })
  return {
    ...original,
    sendEmailThroughResend: mockedSendEmailThroughResend,
  }
})
