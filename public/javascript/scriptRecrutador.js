let selecionados = [];

$(function() {
    $(document).ajaxStop(function(e) {
        location.reload(true); 
    });

    $('label[for="exibirArquivados"]').click(function(e) {
        $("#curriculosArquivados").css('display', 'inline');
        $("#curriculosNaoArquivados").css('display', 'none');
    });

    $('label[for="exibirNaoArquivados"]').click(function(e) {
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
            
        }
    });
}

function desarquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'DESARQUIVAR',
        method: 'PUT',
        url: 'curriculo/' + curriculoId + '/desarquivar/',
        success: function(data) {
            
        }
    });
}

function deletarCurriculo(curriculoId) {
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId,
        success: function(data) {
            
        }
    });
}

function arquivarSelecionados() {
    selecionados.forEach(selecionado => {
        arquivarCurriculo(selecionado);
    });
}

function deletarSelecionados() {
    selecionados.forEach(selecionado => {
        deletarCurriculo(selecionado);
    });
}