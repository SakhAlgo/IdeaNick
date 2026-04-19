'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
process.env.WEBAPP_URL = 'https://example.com'
const pumpGetRoute_1 = require('./pumpGetRoute')
describe('pgr', () => {
  it('return simple route', () => {
    const getSimpleRoute = (0, pumpGetRoute_1.pgr)(() => '/simple')
    expect(getSimpleRoute()).toBe('/simple')
  })
  it('return route with params', () => {
    const getWithParamsRoute = (0, pumpGetRoute_1.pgr)(
      { param1: true, param2: true },
      ({ param1, param2 }) => `/a/${param1}/b/${param2}/c`
    )
    expect(getWithParamsRoute({ param1: 'xxx', param2: 'yyy' })).toBe('/a/xxx/b/yyy/c')
  })
  it('return route definition', () => {
    const getWithParamsRoute = (0, pumpGetRoute_1.pgr)(
      { param1: true, param2: true },
      ({ param1, param2 }) => `/a/${param1}/b/${param2}/c`
    )
    expect(getWithParamsRoute.definition).toBe('/a/:param1/b/:param2/c')
  })
  it('return route placeholders', () => {
    const getWithParamsRoute = (0, pumpGetRoute_1.pgr)(
      { param1: true, param2: true },
      ({ param1, param2 }) => `/a/${param1}/b/${param2}/c`
    )
    expect(getWithParamsRoute.placeholders).toMatchObject({ param1: ':param1', param2: ':param2' })
  })
  it('return absolute route', () => {
    const getSimpleRoute = (0, pumpGetRoute_1.pgr)(() => '/simple')
    expect(getSimpleRoute({ abs: true })).toBe('https://example.com/simple')
  })
})
//# sourceMappingURL=pumpGetRoute.unit.test.js.map
