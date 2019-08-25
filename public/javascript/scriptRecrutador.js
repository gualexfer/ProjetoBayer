let selecionados = [];

$(function() {
    $('label[for="exibirArquivados"]').click(function(e){
        $("#curriculosArquivados").css('display', 'inline');
        $("#curriculosNaoArquivados").css('display', 'none');
    });

    $('label[for="exibirNaoArquivados"]').click(function(e){
        $("#curriculosArquivados").css('display', 'none');
        $("#curriculosNaoArquivados").css('display', 'inline');
    });

    $('input[type="checkbox"]').on('change', function(e) {
        if (this.checked) {
            selecionados.push(this.id);
        } else {
            selecionados.splice(selecionados.indexOf(this.id), 1);
        }
    });
});

function arquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'ARQUIVAR',
        method: 'PUT',
        url: 'curriculo/' + curriculoId + '/arquivar/',
        success: function(data) {
            location.reload(true);
        }
    });
}

function desarquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'DESARQUIVAR',
        method: 'PUT',
        url: 'curriculo/' + curriculoId + '/desarquivar/',
        success: function(data) {
            location.reload(true);
        }
    });
}

function deletarCurriculo(curriculoId) {
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId,
        success: function(data) {
            location.reload(true);
        }
    });
}