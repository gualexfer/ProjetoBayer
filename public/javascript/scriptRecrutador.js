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
        type: 'PUT',
        url: 'curriculo/' + curriculoId
    });

    location.reload(true);
}

function deletarCurriculo(curriculoId) {
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId
    });

    location.reload(true);
}