import { EOL } from 'os'
import debug from 'debug'
import _ from 'lodash'
import { createColors } from 'picocolors'
import { serializeError } from 'serialize-error'
import { MESSAGE } from 'triple-beam'
import winston from 'winston'
import * as yaml from 'yaml'
import { env } from './env'

// Принудительно включаем цвета
const pc = createColors(true)

type LogData = {
  logType: string
  timestamp: string
} & winston.Logform.TransformableInfo

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'backend', hostEnv: env.HOST_ENV },
  transports: [
    new winston.transports.Console({
      format:
        env.HOST_ENV !== 'local'
          ? winston.format.json()
          : winston.format((info) => {
              const logData = info as LogData

              const setColor = {
                info: (str: string) => pc.blue(str),
                error: (str: string) => pc.red(str),
                debug: (str: string) => pc.cyan(str),
              }[logData.level as 'info' | 'error' | 'debug']

              const levelAndType = `${logData.level} ${logData.logType}`
              const topMessage = `${setColor(levelAndType)} ${pc.green(logData.timestamp)}${EOL}${logData.message}`

              const visibleMessageTags = _.omit(logData, [
                'level',
                'logType',
                'timestamp',
                'message',
                'service',
                'hostEnv',
              ])

              const stringifyedLogData = _.trim(
                yaml.stringify(visibleMessageTags, (_k, v) => (_.isFunction(v) ? 'Function' : v))
              )

              const resultLogData = {
                ...logData,
                [MESSAGE]:
                  [topMessage, Object.keys(visibleMessageTags).length > 0 ? `${EOL}${stringifyedLogData}` : '']
                    .filter(Boolean)
                    .join('') + EOL,
              }

              return resultLogData
            })(),
    }),
  ],
})

export const logger = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (logType: string, message: string, meta?: Record<string, any>) => {
    if (!debug.enabled(`ideanick:${logType}`)) {
      return
    }
    winstonLogger.info(message, { logType, ...meta })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (logType: string, error: unknown, meta?: Record<string, any>) => {
    const serializedError = serializeError(error)
    if (!debug.enabled(`ideanick:${logType}`)) {
      return
    }
    winstonLogger.error(typeof serializedError.message === 'string' ? serializedError.message : 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...meta,
    })
  },
}
