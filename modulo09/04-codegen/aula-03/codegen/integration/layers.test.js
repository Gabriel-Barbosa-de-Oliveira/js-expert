import {
    expect,
    describe,
    test,
    jest,
    beforeEach,
    beforeAll,
    afterAll
} from '@jest/globals'

import { tmpdir } from "os"
import fsPromises from "fs/promises"
import { join } from 'path'

import { createLayersIfNotExists } from './../src/createLayers.js'


describe('#Integration - Layers - Folders Structure', () => {
    const config = {
        defaultMainFolder: "src",
        mainPath: "",
        //colocamos um sort, pq o sistema retorna em ordem alfabetica
        layers: ["service", "factory", "repository"].sort()
    }
    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true})
    })

    test('should not create folders if it exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath)

        //run  
        await createLayersIfNotExists(config)

        const afterRun = await fsPromises.readdir(join(config.mainPath, config.defaultMainFolder))
        expect(beforeRun).not.toStrictEqual(afterRun)
        expect(afterRun).toEqual(config.layers)

    })  
    test.todo('should create folders if it doesnt exists')


})
