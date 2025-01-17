import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from "@jest/globals"
import templates from "../../src/templates"

const {
    repositoryTemplate,
    serviceTemplate
} = templates;

import {
    factoryTemplateMock,
    repositoryTemplateMock,
    serviceTemplateMock
} from "./mocks/index.js"
import { factoryTemplate } from "../../src/templates/factoryTemplate.js";

describe("#Codegen 3-layers arch", () => {
    const componentName = "product"
    const repositoryName = `${componentName}Repository`
    const serviceName = `${componentName}Service`
    const factoryName = `${componentName}Factory`

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })


    test("#should generate repository template", () => {
        const expected = {
            fileName: repositoryName,
            template: repositoryTemplateMock
        }

        const result = repositoryTemplate(componentName)

        expect(result).toStrictEqual(expected)
    })

    test("#should generate service template", () => {
        const expected = {
            fileName: serviceName,
            template: serviceTemplateMock
        }

        const result = serviceTemplate(componentName, repositoryName)

        expect(result).toStrictEqual(expected)
    })

    test("#should generate factory template", () => {
        const expected = {
            fileName: factoryName,
            template: factoryTemplateMock
        }

        const result = factoryTemplate(componentName, repositoryName, serviceName)

        expect(result).toStrictEqual(expected)
    })


})