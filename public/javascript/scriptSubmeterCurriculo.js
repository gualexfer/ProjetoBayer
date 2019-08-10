let numeroDeExperiencias = 0;
let numeroDeFormacoes = 0;
let numeroDeIdiomas = 0;

$(function(e) {
    $('[name="cep"]').on("change", function(e) {
        const cep = document.getElementById("cep").value;
        const url = "http://cep.republicavirtual.com.br/web_cep.php?cep=" + cep + "&formato=jsonp";
        jsonp(url, ({ resultado, uf, cidade, bairro, tipo_logradouro, logradouro }) => {
            if (resultado == 1) {
                const endereco = document.getElementById("endereco");
                const city = document.getElementById("cidade");
                const state = document.getElementById("estado");
                const bair = document.getElementById("bairro");
                endereco.value = tipo_logradouro + " " + logradouro;
                city.value = cidade;
                state.value = uf;
                bair.value = bairro;
            }
        });
    })

    $('[name="dataDeNascimento"]').focusout(function(e) {
        if ($('[name="dataDeNascimento"]').val() != '') {
            let nascimento = new Date($('[name="dataDeNascimento"]').val());
            let data = new Date();
            let idade = calculateAge(nascimento, data);
            if (idade > 0) {
                $('[name="idade"]').val(idade);
            }
        }
    });
});

function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = (data) => {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function calculateAge (birthDate, otherDate) {
    birthDate = new Date(birthDate);
    otherDate = new Date(otherDate);

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < parseInt(birthDate.getDate() + 1)) {
        years--;
    }

    return years;
}

function adicionarIdioma() {
    let idiomas = document.getElementById('idiomas');
    
    $("#novoIdioma > [name='idioma'] > .form-group > #idioma").attr("name", "idiomas["+ numeroDeIdiomas +"][idioma]")
    $("#novoIdioma > [name='fluencia'] > .form-group > .form-control").attr("name", "idiomas["+ numeroDeIdiomas +"][nivelDeFluencia]");
    $("#novoIdioma > [name='instituicao'] > .form-group > #instituicaoDeEnsino").attr("name", "idiomas["+ numeroDeIdiomas +"][instituicao]");

    let clone = document.getElementById('novoIdioma').cloneNode(true);
    clone.setAttribute("id", "novoIdioma" + numeroDeIdiomas);
    clone.setAttribute("name", "novoIdioma" + numeroDeIdiomas++);

    idiomas.appendChild(clone);

    clone.hidden = false;
}

function removerIdioma() {
    if (numeroDeIdiomas > 0) {
        let idioma = "#novoIdioma" + (numeroDeIdiomas - 1);
        $(idioma).remove();
        numeroDeIdiomas--;
    }
}

function adicionarFormacao() {
    $('<div id="novaFormacao' + numeroDeFormacoes + '" class="container"><div class="form-row"><div class="form-group col"><label for="titulo">Título:</label><input type="text" class="form-control" id="titulo' + numeroDeFormacoes + '" name="titulo' + numeroDeFormacoes + '" required></div><div class="form-group col"><label for="instituicao">Instituição:</label><input type="text" id="instituicao' + numeroDeFormacoes + '" class="form-control" name="instituicao' + numeroDeFormacoes + '" name="instituicao' + numeroDeFormacoes + '" required></div></div><div class="form-row"><div class="form-group col"><label for="inicioDaFormacao">Ano de início:</label><input type="number" id="inicioDaFormacao' + numeroDeFormacoes + '" class="form-control" name="inicioDaFormacao' + numeroDeFormacoes + '" required></div><div class="form-group col"><label for="fimDaFormacao">Ano de finalização:</label><input type="number" id="fimDaFormacao' + numeroDeFormacoes + '" class="form-control" name="fimDaFormacao' + numeroDeFormacoes + '" required></div></div><label for="comentarios">Comentários:</label><textarea class="form-control" rows="5" id="comentarios' + numeroDeFormacoes + '" class="form-control" name="comentarios' + numeroDeFormacoes++ + '"></textarea></div>').insertBefore("#idiomas");
}

function removerFormacao(numero) {
    if (numeroDeFormacoes > 0) {
        let formacao = "#novaFormacao" + (numeroDeFormacoes - 1);
        $(formacao).remove();
        numeroDeFormacoes--;
    }
}

function adicionarExperiencia() {
    $('<div id="novaExperiencia' + numeroDeExperiencias + '" class="container"><div class="form-row"><div class="form-group col"><label for="cargo">Cargo:</label><input type="text" id="cargo' + numeroDeExperiencias + '" class="form-control" name="cargo' + numeroDeExperiencias + '" required></div><div class="form-group col"><label for="empresa">Empresa:</label><input type="text" id="empresa' + numeroDeExperiencias + '" class="form-control" name="empresa' + numeroDeExperiencias + '" required></div></div><div class="form-row"><div class="form-group col"><label for="inicioDaExperiencia">Ano de início*:</label><input type="number" id="inicioDaExperiencia' + numeroDeExperiencias + '" class="form-control" name="inicioDaExperiencia' + numeroDeExperiencias + '" required></div><div class="form-group col"><label for="fimDaExperiencia">Ano de fim*:</label><input type="number" id="fimDaExperiencia' + numeroDeExperiencias + '" class="form-control" name="fimDaExperiencia' + numeroDeExperiencias + '" required></div></div><label for="descricao">Descrição do cargo*:</label><textarea class="form-control" rows="5" id="descricao' + numeroDeExperiencias + '" class="form-control" name="descricao' + numeroDeExperiencias++ + '" required></textarea></div>').insertBefore("#adicionais");
}

function removerExperiencia(numero) {
    if (numeroDeExperiencias > 0) {
        let experiencia = "#novaExperiencia" + (numeroDeExperiencias - 1);
        $(experiencia).remove();
        numeroDeExperiencias--;
    }
}

function arquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'PUT',
        url: 'curriculo/' + curriculoId
    });
}