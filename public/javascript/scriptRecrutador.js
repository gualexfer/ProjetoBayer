let selecionados = [];
let selectedId;

$(function() {
    $(document).ajaxStop(function(e) {
        location.reload(true); 
    });

    $('#exibirArquivados').click(function(e) {
        let vaga = $("[name='vaga']").val();
        if (vaga !== "selecione") {
            $("#curriculosArquivados" + vaga).removeClass('d-none');
            $("#curriculosNaoArquivados" + vaga).addClass('d-none');
        }
    });

    $('#exibirNaoArquivados').click(function(e) {
        let vaga = $("[name='vaga']").val();
        if (vaga !== "selecione") {
            $("#curriculosArquivados" + vaga).addClass('d-none');
            $("#curriculosNaoArquivados" + vaga).removeClass('d-none');
        }
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
    $("[name='vaga']").on("change", function(e) {
        let vaga = $("[name='vaga']").val();
        if(vaga !== "selecione") {
            if (selectedId != undefined) {
                $("#curriculosNaoArquivados" + selectedId).addClass("d-none");
                $("#curriculosArquivados" + selectedId).addClass("d-none");
            }
            $("#curriculosNaoArquivados" + vaga).removeClass("d-none");
            selectedId = vaga;
        }
    });
});

function removerVaga() {
    let vaga = $("[name='vaga']").val();
    
    if (vaga !== "selecione") {
        $.ajax({
            method: 'DELETE',
            url: 'recrutador/deletarVaga/' + vaga
        });
    }
}

function filtrar(curriculosArquivados, curriculosNaoArquivados) {
    console.log(curriculosArquivados);
}

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