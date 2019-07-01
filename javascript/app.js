let experiencias = [];
let formacoes = [];
let idiomas = [];
let numeroDeExperiencias = 0;
let numeroDeFormacoes = 0;
let numeroDeIdiomas = 0;

$(function(e) {
    
});

function adicionarIdioma() {
    $('<div id="novoIdioma' + numeroDeIdiomas + '"><label for="idioma' + numeroDeIdiomas + '">Idioma: </label><input type = "text" id="idioma' + numeroDeIdiomas + '" required><label for="fluencia">Nível de fluência: </label><select id="fluencia' + numeroDeIdiomas++ + '"><option>Básico</option><option>Intermediário</option><option>Avançado</option><option>Fluente</option></select></div>').insertBefore("#contato");
}

function removerIdioma() {
    if (numeroDeIdiomas > 0) {
        let idioma = "#novoIdioma" + (numeroDeIdiomas - 1);
        $(idioma).remove();
        numeroDeIdiomas--;
    }
}

function adicionarFormacao() {
    $('<div id="novaFormacao' + numeroDeFormacoes + '"><label for="titulo">Título*:</label><input type="text" id="titulo' + numeroDeFormacoes + '" required><label for="instituicao">Instituição*:</label><input type="text" id="instituicao' + numeroDeFormacoes + '" required><label for="inicioDaFormacao">Ano de início*:</label><input type="number" id="inicioDaFormacao' + numeroDeFormacoes + '" required><label for="fimDaFormacao">Ano de finalização*:</label><input type="number" id="fimDaFormacao' + numeroDeFormacoes + '" required><label for="comentarios">Comentários:</label><input type="text" id="comentarios' + numeroDeFormacoes++ + '"></div>').insertBefore("#experiencia");
}

function removerFormacao(numero) {
    if (numeroDeFormacoes > 0) {
        let formacao = "#novaFormacao" + (numeroDeFormacoes - 1);
        $(formacao).remove();
        numeroDeFormacoes--;
    }
}

function adicionarExperiencia() {
    $('<div id="novaExperiencia' + numeroDeExperiencias + '"><label for="cargo">Cargo*:</label><input type="text" id="cargo' + numeroDeExperiencias + '" required><label for="empresa">Empresa*:</label><input type="text" id="empresa' + numeroDeExperiencias + '" required><label for="inicioDaExperiencia">Ano de início*:</label><input type="number" id="inicioDaExperiencia' + numeroDeExperiencias + '" required><label for="fimDaExperiencia">Ano de fim*:</label><input type="number" id="fimDaExperiencia' + numeroDeExperiencias + '" required><label for="descricao">Descrição do cargo*:</label><input type="text" id="descricao' + numeroDeExperiencias++ + '" required></div>').insertBefore("#adicionais");
}

function removerExperiencia(numero) {
    if (numeroDeExperiencias > 0) {
        let experiencia = "#novaExperiencia" + (numeroDeExperiencias - 1);
        $(experiencia).remove();
        numeroDeExperiencias--;
    }
}

function enviarCurriculo() {
    if (numeroDeIdiomas <= 0)
        alert("Insira idiomas!");
    else if (numeroDeFormacoes <= 0)
        alert("Inisira formações!");
    else if (numeroDeExperiencias <= 0)
        alert("Insira experiências!");
    else {
        instanciarIdiomas();
        instanciarFormacoes();
        instanciarExperiencias();
    }
}

function instanciarIdiomas() {
    for (let i = 0; i  < numeroDeIdiomas; i++) {
        let nome = document.getElementById('idioma' + i).value;
        let fluencia = document.getElementById('fluencia' + i).value;
        let idioma = new Idioma(nome, fluencia);
        idiomas.push(idioma);
    }
}

function instanciarFormacoes() {
    for (let i = 0; i  < numeroDeFormacoes; i++) {
        let titulo = document.getElementById('titulo' + i).value;
        let instituicao = document.getElementById('instituicao' + i).value;
        let inicioDaFormacao = document.getElementById('inicioDaFormacao' + i).value;
        let fimDaFormacao = document.getElementById('fimDaFormacao' + i).value;
        let comentarios = document.getElementById('comentarios' + i).value;
        let formacao = new Formacao(titulo, instituicao, inicioDaFormacao, fimDaFormacao, comentarios);
        formacoes.push(formacao);
    }
}

function instanciarExperiencias() {
    for (let i = 0; i < numeroDeExperiencias; i++) {
        let cargo = document.getElementById('cargo' + i).value;
        let empresa = document.getElementById('empresa' + i).value;
        let inicioDaExperiencia = document.getElementById('inicioDaExperiencia' + i).value;
        let fimDaExperiencia = document.getElementById('fimDaExperiencia' + i).value;
        let descricao = document.getElementById('descricao' + i).value;
        let experiencia = new Experiencia(cargo, empresa, inicioDaExperiencia, fimDaExperiencia, descricao);
        experiencias.push(experiencia);
    }
}