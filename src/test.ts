import test from 'ava'
import { default as yaml } from 'js-yaml'
import { default as fs } from 'fs'
import { default as path } from 'path'
import { default as glob } from 'fast-glob'
import { createValidator } from '@typeonly/validator'
import { createStandaloneRtoModule, parseTypeOnly } from 'typeonly'

interface TestConfig {
  typeDefinitionFile?: string
  jsonInputTests: Array<{
    files: string | string[]
    expectType: string
  }>
}

const pathToRoot = path.join(__dirname, '../')
const configFilePath = path.join(pathToRoot, 'test-config.yaml')

async function runTypecheckTests() {
  const configText = await fs.promises.readFile(configFilePath, 'utf-8')
  const tests: TestConfig[] = yaml.load(configText)

  let outputs = []
  for (let entry of tests) {
    console.log('Running test for file', entry.typeDefinitionFile)

    const tsFilePath = path.join(pathToRoot, entry.typeDefinitionFile)
    const tsFile = await fs.promises.readFile(tsFilePath, 'utf-8')

    const validator = await createValidator({
      modulePaths: ['./placeholder'],
      rtoModuleProvider: async () =>
        createStandaloneRtoModule({ ast: parseTypeOnly({ source: tsFile }) }),
    })

    for (let { files, expectType } of entry.jsonInputTests) {
      for (let file of await glob(files, { cwd: pathToRoot })) {
        console.log('Checking input data from', file)

        const filePath = path.join(pathToRoot, file)
        const filetext = await fs.promises.readFile(filePath, 'utf-8')

        const testData = JSON.parse(filetext)
        const result = validator.validate(expectType, testData, './placeholder')

        const { typeDefinitionFile } = entry
        outputs.push({ file, result, typeDefinitionFile })
      }
    }
  }

  return outputs
}

async function main() {
  for (let output of await runTypecheckTests()) {
    const testFileInfo = `[TYPE]: ${output.typeDefinitionFile} \n[INPUT]: ${output.file}`

    test('Expect Pass & Get Valid Result \n' + testFileInfo, (t) => {
      t.is(output.result.valid, true)
    })
  }
}

main()

// main().catch((err) => console.log('ERR IN MAIN', err))
