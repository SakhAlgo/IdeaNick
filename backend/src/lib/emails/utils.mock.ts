import { type sendEmail } from './utils'

jest.mock('./utils', () => {
  const mockedSendEmail: typeof sendEmail = jest.fn(async () => {
    return {
      ok: true,
    }
  })
  return {
    sendEmail: mockedSendEmail,
  }
})
