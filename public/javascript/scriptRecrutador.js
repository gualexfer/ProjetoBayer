$(function() {
    $('#exibirArquivados').on('change', function(e) {
        if (this.checked)
            $("#curriculosArquivados").css('visibility', 'visible');
        else
            $("#curriculosArquivados").css('visibility', 'hidden');
    });
});

function arquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'PUT',
        url: 'curriculo/' + curriculoId
    });

    window.location = window.location.pathname;
}

function deletarCurriculo(curriculoId) {
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId
    });

    window.location = window.location.pathname;
}