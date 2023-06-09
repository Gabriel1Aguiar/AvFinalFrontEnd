function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(obj) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function excluirMensagem(idMsg) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens' + '/' + toString(idMsg),
        method: 'DELETE',
        async: false
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    var retorno = false;

    console.log(objLoginSenha);

    var validacao = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
                },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function(){
        return retorno;
    });

    validacao.done(function(data) {
        retorno = data;
    });

    return retorno;
}

function enviarMensagem() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("mensagem").value;

    var obj = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    inserirMensagem(obj);

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";

    alert("Mensagem enviada com sucesso!");
}

function realizarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var obj = {
        email: email,
        senha: senha
    };

    var valido = validarUsuario(obj);

    if (valido) {        
        window.location.href = "mensagens.html";
    } else {
        alert("Usuário ou senha inválidos");
    }
}