import { pick } from '@ideanick/shared/pick'
import axios, { type AxiosResponse } from 'axios'
import { env } from './env'
import { logger } from './logger'

type ResendResponse = {
  id: string
}

type ResendErrorResponse = {
  name: string
  message: string
  statusCode: number
}

const makeRequestToResend = async ({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>
}): Promise<{
  originalResponse?: AxiosResponse
  loggableResponse: Pick<AxiosResponse, 'status' | 'statusText' | 'data'>
}> => {
  if (!env.EMAIL_SERVICE_API_KEY) {
    return {
      loggableResponse: {
        status: 200,
        statusText: 'OK',
        data: { message: 'EMAIL_SERVICE_API_KEY is not set' },
      },
    }
  }
  const response = await axios.post<ResendResponse>('https://api.resend.com/emails', params, {
    headers: {
      Authorization: `Bearer ${env.EMAIL_SERVICE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    validateStatus: () => true, // не бросать исключение на 4xx/5xx
  })
  logger.info('Resend raw response:', JSON.stringify(response.data, null, 2))
  if (response.status < 200 || response.status >= 300) {
    const error = response.data as unknown as ResendErrorResponse
    throw new Error(`Resend API error [${response.status}]: ${error.message}`)
  }

  return {
    originalResponse: response,
    loggableResponse: pick(response, ['status', 'statusText', 'data']),
  }
}

export const sendEmailThroughResend = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  return await makeRequestToResend({
    params: {
      to,
      subject,
      html,
      from: `${env.FROM_EMAIL_NAME} <${env.FROM_EMAIL_ADDRESS}>`,
    },
  })
}
