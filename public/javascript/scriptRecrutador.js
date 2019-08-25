$(function() {
    $('label[for="exibirArquivados"]').click(function(e){
        $("#curriculosArquivados").css('display', 'inline');
        $("#curriculosNaoArquivados").css('display', 'none');
    });
    $('label[for="exibirNaoArquivados"]').click(function(e){
        $("#curriculosArquivados").css('display', 'none');
        $("#curriculosNaoArquivados").css('display', 'inline');
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