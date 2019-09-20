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
            $("#arquivarSelecionados").attr("value", "Desarquivar selecionados");
            $("#arquivarSelecionados").attr("onClick", "mostrarModal('desarquivar')");
        }
    });

    $('#exibirNaoArquivados').click(function(e) {
        let vaga = $("[name='vaga']").val();
        if (vaga !== "selecione") {
            $("#curriculosArquivados" + vaga).addClass('d-none');
            $("#curriculosNaoArquivados" + vaga).removeClass('d-none');
            $("#arquivarSelecionados").attr("value", "Aquivar selecionados");
            $("#arquivarSelecionados").attr("onClick", "mostrarModal('arquivar')");
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
        let vaga = $("[name='vaga']").val();
        
        if (vaga !== "selecione") {
            $('.row').find('.active').removeClass('active');
            $(this).addClass("active");
        }
    });

    $('[name="inserirNovaVaga"]').on('submit', function(e) {
        e.preventDefault();

        let nome = $("#nome").val();
        let palavrasChave = $("#palavrasChave").val().trim().split(',');

        if (nome != '') {
            $.ajax({
                method: 'POST',
                url: 'recrutador/inserirVaga/',
                data: {
                    nome,
                    palavrasChave
                }
            });
        }
    });
    $("[name='vaga']").on("change", function(e) {
        let vaga = $("[name='vaga']").val();
        if(vaga !== "selecione") {
            if (selectedId != undefined) {
                $("#curriculosNaoArquivados" + selectedId).addClass("d-none");
                $("#curriculosArquivados" + selectedId).addClass("d-none");
                $('#exibirArquivados').removeClass('active');
                $('#exibirNaoArquivados').addClass('active');
                $("#arquivarSelecionados").attr("value", "Aquivar selecionados");
                $("#arquivarSelecionados").attr("onClick", "mostrarModal('arquivar')");
            }
            $("#curriculosNaoArquivados" + vaga).removeClass("d-none");
            selectedId = vaga;
        }
    });
    $("#pesquisaPorNome").on("input", function(e) {
        const nome = $(this).val();
        $('.nome').each(function() {
            if (!$(this).text().toLowerCase().includes(nome.toLowerCase())) {
                $(this).parent().parent().parent().addClass('d-none');
            } else {
                $(this).parent().parent().parent().removeClass('d-none');
            }
        });
    });
});

function mostrarModal(paraQuem) {
    if (paraQuem === 'desarquivar') {
        $("#modal-body-text").text("Deseja realmente desarquivar todos os selecionados?");
        $("#modalYes").attr("onClick", "desarquivarSelecionados()");
    } else if (paraQuem === 'arquivar') {
        $("#modal-body-text").text("Deseja realmente arquivar todos os selecionados?");
        let clone = $("#email").clone(true);
        $(clone).removeAttr('hidden');
        $("#modal-body-text").append(clone);
        $("#modalYes").attr("onClick", "arquivarSelecionados()");
    } else if (paraQuem === 'deletar') {
        $("#modal-body-text").text("Deseja realmente deletar todos os selecionados?");
        $("#modalYes").attr("onClick", "deletarSelecionados()");
    }
}

function removerVaga() {
    let vaga = $("[name='vaga']").val();
    
    if (vaga !== "selecione") {
        $.ajax({
            method: 'DELETE',
            url: 'recrutador/deletarVaga/' + vaga
        });
    }
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