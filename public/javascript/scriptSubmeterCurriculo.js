let numeroDeExperiencias = 0;
let numeroDeFormacoes = 0;
let numeroDeIdiomas = 0;
let vagaSelecionada;

$(function(e) {
    $('[name="contato[cep]"]').on("change", function(e) {
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

                $('#endereco').removeClass('is-invalid');
                $('#cidade').removeClass('is-invalid');
                $('#estado').removeClass('is-invalid');
                $('#bairro').removeClass('is-invalid');

                $('#endereco').addClass('is-valid');
                $('#cidade').addClass('is-valid');
                $('#estado').addClass('is-valid');
                $('#bairro').addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
                $('#endereco').removeClass('is-valid');
                $('#cidade').removeClass('is-valid');
                $('#estado').removeClass('is-valid');
                $('#bairro').removeClass('is-valid');

                $(this).addClass('is-invalid');
                $('#endereco').addClass('is-invalid');
                $('#cidade').addClass('is-invalid');
                $('#estado').addClass('is-invalid');
                $('#bairro').addClass('is-invalid');
            }
        });
    })

    $('[name="perfil[dataDeNascimento]"]').focusout(function(e) {
        if ($('[name="perfil[dataDeNascimento]"]').val() != '') {
            let nascimento = new Date($('[name="perfil[dataDeNascimento]"]').val());
            let data = new Date();
            let idade = calcularIdade(nascimento, data);
            if (idade > 0) {
                $('[name="perfil[idade]"]').val(idade);
                $('[name="perfil[dataDeNascimento]"]').removeClass('is-invalid');
                $('[name="perfil[dataDeNascimento]"]').addClass('is-valid');
            } else {
                $('[name="perfil[dataDeNascimento]"]').removeClass('is-valid');
                $('[name="perfil[dataDeNascimento]"]').addClass('is-invalid');
            }
        }
    });

    $('input[type="text"]').focusout(function(e) {
        if($(this).attr("id") != "complemento") {
            if ($(this).val() != "") {
                $(this).addClass("is-valid");
                $(this).removeClass("is-invalid");
            }
            else {
                $(this).addClass("is-invalid");
                $(this).removeClass("is-valid");
            }
        }
    });

    $('input[type="email"]').focusout(function(e) {
        if(validarEmail($('input[type="email"]').val())) {
            $('input[type="email"]').removeClass('is-invalid');
            $('input[type="email"]').addClass('is-valid');
        } else {
            $('input[type="email"]').addClass('is-invalid');
            $('input[type="email"]').removeClass('is-valid');
        }
    });
});

function validarEmail(email) {
    var expressao = /\S+@\S+\.\S+/;
    return expressao.test(email);
}

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

function calcularIdade(dataDeNascimento, dataDeHoje) {
    dataDeHoje = new Date(dataDeHoje);
    dataDeNascimento = new Date(dataDeNascimento);

    var idade = (dataDeHoje.getFullYear() - dataDeNascimento.getFullYear());

    if (dataDeHoje.getMonth() < dataDeNascimento.getMonth() || 
        dataDeHoje.getMonth() == dataDeNascimento.getMonth() && dataDeHoje.getDate() < parseInt(dataDeNascimento.getDate() + 1)) {
        idade--;
    }

    return idade;
}

function selecionar() {
    $("#seletorDeVaga").css('display', 'none');
    $("#formEscondido").css('display', 'inline');
    $("#pagperfil").removeClass("form-inline");
}

function adicionarIdioma() {
    let idiomas = document.getElementById('idiomas');
    
    $("[name='novoIdioma'] > [name='idioma'] > .form-group > #idioma").attr("name", "idiomas["+ numeroDeIdiomas +"][idioma]")
    $("[name='novoIdioma'] > [name='fluencia'] > .form-group > .form-control").attr("name", "idiomas["+ numeroDeIdiomas +"][nivelDeFluencia]");
    $("[name='novoIdioma'] > [name='instituicao'] > .form-group > #instituicaoDeEnsino").attr("name", "idiomas["+ numeroDeIdiomas +"][instituicao]");

    let clone = document.getElementsByName('novoIdioma')[0].cloneNode(true);
    clone.setAttribute("name", "novoIdioma" + numeroDeIdiomas++);

    idiomas.appendChild(clone);

    clone.hidden = false;
}

function removerIdioma() {
    if (numeroDeIdiomas > 0) {
        let idioma = "[name='novoIdioma" + (numeroDeIdiomas - 1) + "']";
        $(idioma).remove();
        numeroDeIdiomas--;
    }
}

function adicionarFormacao() {
    let formacao = document.getElementById('formacao');

    $("[name='novaFormacao'] > .form-row > .form-group > #titulo").attr("name", "formacao["+ numeroDeFormacoes +"][titulo]");
    $("[name='novaFormacao'] > .form-row > .form-group > #instituicao").attr("name", "formacao["+ numeroDeFormacoes +"][instituicao]");
    $("[name='novaFormacao'] > .form-row > .form-group > #inicioDaFormacao").attr("name", "formacao["+ numeroDeFormacoes +"][inicioDaFormacao]");
    $("[name='novaFormacao'] > .form-row > .form-group > #fimDaFormacao").attr("name", "formacao["+ numeroDeFormacoes +"][fimDaFormacao]");
    $("[name='novaFormacao'] > #comentarios").attr("name", "formacao["+ numeroDeFormacoes +"][comentarios]");

    let clone = document.getElementsByName('novaFormacao')[0].cloneNode(true);
    clone.setAttribute("name", "novaFormacao" + numeroDeFormacoes++);

    formacao.appendChild(clone);

    clone.hidden = false;
}

function removerFormacao(numero) {
    if (numeroDeFormacoes > 0) {
        let formacao = "[name='novaFormacao" + (numeroDeFormacoes - 1) + "']";
        $(formacao).remove();
        numeroDeFormacoes--;
    }
}

function adicionarExperiencia() {
    let experiencia = document.getElementById('experiencia');

    $("[name='novaExperiencia'] > .form-row > .form-group > #cargo").attr("name", "experiencias["+ numeroDeExperiencias +"][cargo]");
    $("[name='novaExperiencia'] > .form-row > .form-group > #empresa").attr("name", "experiencias["+ numeroDeExperiencias +"][empresa]");
    $("[name='novaExperiencia'] > .form-row > .form-group > #inicioDaExperiencia").attr("name", "experiencias["+ numeroDeExperiencias +"][inicioDaExperiencia]");
    $("[name='novaExperiencia'] > .form-row > .form-group > #fimDaExperiencia").attr("name", "experiencias["+ numeroDeExperiencias +"][fimDaExperiencia]");
    $("[name='novaExperiencia'] > #descricao").attr("name", "experiencias["+ numeroDeExperiencias +"][descricao]");

    let clone = document.getElementsByName('novaExperiencia')[0].cloneNode(true);
    clone.setAttribute("name", "novaExperiencia" + numeroDeExperiencias++);

    experiencia.appendChild(clone);

    clone.hidden = false;
}

function removerExperiencia(numero) {
    if (numeroDeExperiencias > 0) {
        let experiencia = "[name='novaExperiencia" + (numeroDeExperiencias - 1) + "']";
        $(experiencia).remove();
        numeroDeExperiencias--;
    }
}
