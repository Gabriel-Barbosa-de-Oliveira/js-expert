import fsPromises from "fs/promises"
import fs from "fs"
import templates from "./templates/index.js"

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
    const keys = Object.keys(templates)
    for (const layer of layers) {
        const chosenTemplate = keys.find(key => key === key.includes(layer))
        if (!chosenTemplate) return { error: "The chosen layer doesnt have a template" }
    }
}