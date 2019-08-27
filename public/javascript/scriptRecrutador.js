let selecionados = [];

$(function() {
    $(document).ajaxStop(function(e) {
        location.reload(true); 
    });

    $('#exibirArquivados').click(function(e) {
        $("#curriculosArquivados").css('display', 'inline');
        $("#curriculosNaoArquivados").css('display', 'none');
        $("input[value='Arquivar selecionados']").attr("onClick", "desarquivarSelecionados()");
        $("input[value='Arquivar selecionados']").val("Desarquivar selecionados");
    });

    $('#exibirNaoArquivados').click(function(e) {
        $("#curriculosArquivados").css('display', 'none');
        $("#curriculosNaoArquivados").css('display', 'inline');
        $("input[value='Desarquivar selecionados']").attr("onClick", "arquivarSelecionados()");
        $("input[value='Desarquivar selecionados']").val("Arquivar selecionados");
    });

    $('input[type="checkbox"]').on('change', function(e) {
        if (this.checked) {
            selecionados.push(this.id);
        } else {
            selecionados.splice(selecionados.indexOf(this.id), 1);
        }
    });

    $('.activable').on('click', function(e) {
        $('.row').find('.active').removeClass('active');
        $(this).addClass("active");
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

function desarquivarSelecionados() {
    selecionados.forEach(selecionado => {
        desarquivarCurriculo(selecionado);
    });
}