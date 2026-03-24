import axios, { type AxiosResponse } from 'axios'
import _ from 'lodash'
import { env } from './env'

type DashaMailResponse = {
  response: {
    msg: {
      err_code: number
      text: string
      type: 'message' | 'notice' | 'error'
    }
    data?: unknown
  }
}

const makeRequestToDashaMail = async ({
  method,
  params,
}: {
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>
}): Promise<{
  originalResponse?: AxiosResponse
  loggableResponse: Pick<AxiosResponse, 'status' | 'statusText' | 'data'>
}> => {
  const response = await axios.get<DashaMailResponse>('https://api.dashamail.ru/', {
    params: {
      method,
      api_key: env.EMAIL_SERVICE_API_KEY,
      format: 'json',
      ...params,
    },
  })
  console.info('DashaMail raw response:', JSON.stringify(response.data, null, 2))
  if (response.data.response.msg.err_code !== 0) {
    throw new Error(`DashaMail API error [${response.data.response.msg.err_code}]: ${response.data.response.msg.text}`)
  }

  return {
    originalResponse: response,
    loggableResponse: _.pick(response, ['status', 'statusText', 'data']),
  }
}

export const sendEmailThroughDashaMail = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  return await makeRequestToDashaMail({
    method: 'mail.send',
    params: {
      to,
      subject,
      html,
      from_email: env.FROM_EMAIL_ADDRESS,
      from_name: env.FROM_EMAIL_NAME,
    },
  })
}
