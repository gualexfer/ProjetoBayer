let selecionados = [];

$(function() {
    $(document).ajaxStop(function(e) {
        location.reload(true); 
    });

    $('#exibirArquivados').click(function(e) {
        $("#curriculosArquivados").css('display', 'block');
        $("#curriculosNaoArquivados").css('display', 'none');
        $("input[value='Arquivar selecionados']").attr("onClick", "desarquivarSelecionados()");
        $("input[value='Arquivar selecionados']").val("Desarquivar selecionados");
    });

    $('#exibirNaoArquivados').click(function(e) {
        $("#curriculosArquivados").css('display', 'none');
        $("#curriculosNaoArquivados").css('display', 'block');
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

    $('[name="inserirNovaVaga"]').on('submit', function(e) {
        e.preventDefault();

        let vaga = $("#nome").val();

        if (vaga != '') {
            $.ajax({
                method: 'POST',
                url: 'recrutador/inserirVaga/' + vaga
            });
        }
    });

    $('[name="removerVagaCadastrada"]').on('submit', function(e) {
        e.preventDefault();

        let vaga = $("[name='vaga']").val();
        
        $.ajax({
            method: 'DELETE',
            url: 'recrutador/deletarVaga/' + vaga
        });
    });
});

function arquivarCurriculo(curriculoId) {
    $.ajax({
        method: 'PUT',
        url: 'curriculo/' + curriculoId + '/arquivar/'
    });
}

function desarquivarCurriculo(curriculoId) {
    $.ajax({
        method: 'PUT',
        url: 'curriculo/' + curriculoId + '/desarquivar/'
    });
}

function deletarCurriculo(curriculoId) {
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId
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