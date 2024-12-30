import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(
            this._validateRequiredFields.name
        )
    }

    _create(data) {
        throw new NotImplementedException(
            this._create.name
        )
    }

    // Padrão de Martin Fowler 
    // A proposta de padrão é garantir um fluxo de metodos, definindo uma sequencia a ser executada
    // Esse create é a implementação efeetiva do template Method

    create(data) {
        const isValid = this._validateRequiredFields(data)
        if (!isValid) throw new Error(`invalid data!`)
        return this._create(data)
    }


}