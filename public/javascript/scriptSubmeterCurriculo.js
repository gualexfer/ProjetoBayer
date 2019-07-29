let numeroDeExperiencias = 0;
let numeroDeFormacoes = 0;
let numeroDeIdiomas = 0;

$(function(e) {

    $('form').on('submit', function(e) {
        /*if (numeroDeExperiencias == 0 || numeroDeFormacoes == 0 || numeroDeIdiomas == 0) {
            if (numeroDeExperiencias == 0) {
                alert('Insira experiências!');
            }
            if (numeroDeFormacoes == 0) {
                alert('Insira formações!');
            }
            if (numeroDeIdiomas == 0) {
                alert('Insira idiomas!');
            }

            e.preventDefault();
        }*/
    });

});

function adicionarIdioma() {
    $('<div id="novoIdioma' + numeroDeIdiomas + '" class="container"><label for="idioma' + numeroDeIdiomas + '">Idioma: </label><input type = "text" class="form-control id="idioma' + numeroDeIdiomas + '" name="idioma' + numeroDeIdiomas + '" required><label for="fluencia">Nível de fluência: </label><select id="fluencia' + numeroDeIdiomas + '" class="form-control" name="fluencia' + numeroDeIdiomas++ + '"><option value="Básico">Básico</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option><option value="Fluente">Fluente</option></select></div>').insertBefore("#contato");
}

function removerIdioma() {
    if (numeroDeIdiomas > 0) {
        let idioma = "#novoIdioma" + (numeroDeIdiomas - 1);
        $(idioma).remove();
        numeroDeIdiomas--;
    }
}

function adicionarFormacao() {
    $('<div id="novaFormacao' + numeroDeFormacoes + '" class="container"><label for="titulo">Título*:</label><input type="text" class="form-control" id="titulo' + numeroDeFormacoes + '" name="titulo' + numeroDeFormacoes + '" required><label for="instituicao">Instituição*:</label><input type="text" id="instituicao' + numeroDeFormacoes + '" class="form-control" name="instituicao' + numeroDeFormacoes + '" name="instituicao' + numeroDeFormacoes + '" required><label for="inicioDaFormacao">Ano de início*:</label><input type="number" id="inicioDaFormacao' + numeroDeFormacoes + '" class="form-control" name="inicioDaFormacao' + numeroDeFormacoes + '" required><label for="fimDaFormacao">Ano de finalização*:</label><input type="number" id="fimDaFormacao' + numeroDeFormacoes + '" class="form-control" name="fimDaFormacao' + numeroDeFormacoes + '" required><label for="comentarios">Comentários:</label><input type="text" id="comentarios' + numeroDeFormacoes + '" class="form-control" name="comentarios' + numeroDeFormacoes++ + '"></div>').insertBefore("#experiencia");
}

function removerFormacao(numero) {
    if (numeroDeFormacoes > 0) {
        let formacao = "#novaFormacao" + (numeroDeFormacoes - 1);
        $(formacao).remove();
        numeroDeFormacoes--;
    }
}

function adicionarExperiencia() {
    $('<div id="novaExperiencia' + numeroDeExperiencias + '" class="container"><label for="cargo">Cargo*:</label><input type="text" id="cargo' + numeroDeExperiencias + '" class="form-control" name="cargo' + numeroDeExperiencias + '" required><label for="empresa">Empresa*:</label><input type="text" id="empresa' + numeroDeExperiencias + '" class="form-control" name="empresa' + numeroDeExperiencias + '" required><label for="inicioDaExperiencia">Ano de início*:</label><input type="number" id="inicioDaExperiencia' + numeroDeExperiencias + '" class="form-control" name="inicioDaExperiencia' + numeroDeExperiencias + '" required><label for="fimDaExperiencia">Ano de fim*:</label><input type="number" id="fimDaExperiencia' + numeroDeExperiencias + '" class="form-control" name="fimDaExperiencia' + numeroDeExperiencias + '" required><label for="descricao">Descrição do cargo*:</label><input type="text" id="descricao' + numeroDeExperiencias + '" class="form-control" name="descricao' + numeroDeExperiencias++ + '" required></div>').insertBefore("#adicionais");
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