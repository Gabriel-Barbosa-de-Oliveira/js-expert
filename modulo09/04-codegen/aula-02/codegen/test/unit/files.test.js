import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from "@jest/globals"

import fsPromises from "fs/promises"
import fs from "fs"
import { createFiles } from "../../src/createFiles"
import templates from "../../src/templates"


describe("#Layers - Files Structure", () => {
    const defaultLayers = ["service", "factory", "repository"]
    const config = {
        mainPath: "./", defaultMainFolder: "src", layers: defaultLayers, componentName: "heroes"
    }
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test("should not create file structure on inexistent template", async () => {
        const myConfig = {
            ...config,
            layers: ["inexistent"]
        }

        const expected = { error: "The chosen layer doesnt have a template" }
        const result = await createFiles(myConfig)
        expect(result).toStrictEqual(expected)
    })


    test("repository should not add any additional dependencies", async () => {
        jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
        jest.spyOn(templates, templates.repositoryTemplate.name)
            .mockReturnValue({ className: "", template: "" })

        const myConfig = {
            ...config,
            layers: ["repository"]
        }

        const expected = { success: true }
        const result = await createFiles(myConfig)
        expect(result).toStrictEqual(expected)
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers)
        expect(templates.repositoryTemplate).toHaveBeenCalledTimes(myConfig.componentName)

    })
    test.todo("service should add repository dependency")
    test.todo("factory should have repository and service as dependencies")

})