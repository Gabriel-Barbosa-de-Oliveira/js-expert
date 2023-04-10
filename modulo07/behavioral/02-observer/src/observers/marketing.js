export default class Marketing {
    update({ id, username }) {
        //importante lembrar que o [update] é responsável por gerenciar seus erros/exeptions 
        //não deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos 
        //só notificar otdo mundo
        console.log(`[${id}]: [maketing] will send an welcome email to ${username}`)
    }
}