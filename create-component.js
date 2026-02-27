/* global process */

import fs from 'fs'

import path from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const componentName = process.argv[2]
if (!componentName) {
  console.error(' Укажи имя компонента.')

  process.exit(1)
}

const baseDir = path.resolve(__dirname, 'webapp/src/components', componentName)

if (fs.existsSync(baseDir)) {
  console.error(' Компонент уже существует.')

  process.exit(1)
}

fs.mkdirSync(baseDir, { recursive: true })

const componentCode = `import styles from './style.module.scss'

export const ${componentName} = () => {

return <div className={styles.${componentName.toLowerCase()}}>${componentName}</div>

}

`

fs.writeFileSync(path.join(baseDir, 'index.tsx'), componentCode)

const styleCode = `.${componentName.toLowerCase()} {

}

`

fs.writeFileSync(path.join(baseDir, 'style.module.scss'), styleCode)

console.info(`Компонент ${componentName} создан в webapp/src/components/${componentName}`)
