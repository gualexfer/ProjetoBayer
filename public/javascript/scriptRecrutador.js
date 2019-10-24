let selecionados = [];
let selectedId, motivo;
 
$(function() {
    $(document).ajaxStop(function(e) {
        location.reload(true);
    });
 
    $('#exibirArquivados').click(function(e) {
        let vaga = $("[name='vagaCurriculo']").val();
        if (vaga !== "selecione") {
            $("#curriculosArquivados" + vaga).removeClass('d-none');
            $("#curriculosNaoArquivados" + vaga).addClass('d-none');
            $("#arquivarSelecionados").attr("value", "Desarquivar selecionados");
            $("#arquivarSelecionados").attr("onClick", "desarquivarSelecionados()");
        }
    });
 
    $('#exibirNaoArquivados').click(function(e) {
        let vaga = $("[name='vagaCurriculo']").val();
        if (vaga !== "selecione") {
            $("#curriculosArquivados" + vaga).addClass('d-none');
            $("#curriculosNaoArquivados" + vaga).removeClass('d-none');
            $("#arquivarSelecionados").attr("value", "Aquivar selecionados");
            $("#arquivarSelecionados").attr("onClick", "adicionarMotivoMultiplo('arquivar')");
        }
    });
 
    $('input[type="checkbox"]').on('change', function(e) {
        if (this.checked) {
            selecionados.push(this.id);
        } else {
            selecionados.splice(selecionados.indexOf(this.id), 1);
        }

        if (selecionados[0] != undefined) {
            $("#arquivarSelecionados").removeClass('d-none');
            $("#deletarSelecionados").removeClass('d-none');
        } else {
            $("#arquivarSelecionados").addClass('d-none');
            $("#deletarSelecionados").addClass('d-none');
        }
    });
 
    $('.activable').on('click', function(e) {
        let vaga = $("[name='vagaCurriculo']").val();
       
        if (vaga !== "selecione") {
            $('.row').find('.active').removeClass('active');
            $(this).addClass("active");
        }
    });
 
    $('[name="inserirNovaVaga"]').on('submit', function(e) {
        e.preventDefault();
 
        let nome = $("#nome").val();
        let palavrasChave = $("#palavrasChave").val().split(',');
        
        $.each(palavrasChave, function(index, value) {
            palavrasChave[index] = palavrasChave[index].trim();
        });

        if (nome != '') {
            $.ajax({
                type: 'POST',
                url: 'recrutador/inserirVaga/',
                data: {
                    nome,
                    palavrasChave
                }
            });
        }
    });

    $("[name='vagaCurriculo']").on("change", function(e) {
        alterarVaga();
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

function alterarPalavrasChave(vagaId) {
    $("#form-alteracao" + vagaId).removeClass("d-none");
}

function enviarAlteracaoDeVaga(vagaId) {
    let novasPalavrasChave = $("#novas-palavras-chave" + vagaId).val();

    if (novasPalavrasChave != "") {
        novasPalavrasChave = novasPalavrasChave.split(',');

        $.each(novasPalavrasChave, function(index, value) {
            novasPalavrasChave[index] = novasPalavrasChave[index].trim();
        });
        
        $.ajax({
            type: 'PUT',
            url: 'recrutador/alterarVaga/' + vagaId,
            data:  {
                novasPalavrasChave
            }
        })
    } else {
        alert("Insira novas palavras-chave!");
    }
}
 
function alterarVaga() {
    let vaga = $("[name='vagaCurriculo']").val();
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
}
 
function mostrarModal(paraQuem) {
    if (paraQuem === 'desarquivar') {
        $("#modal-body-text").text("Deseja realmente desarquivar todos os selecionados?");
        $("#modalYes").attr("onClick", "desarquivarSelecionados()");
    } else if (paraQuem === 'arquivar') {
        $("#modal-body-text").text("Deseja realmente arquivar todos os selecionados?");
        $("#modalYes").attr("onClick", "arquivarSelecionados()");
    } else if (paraQuem === 'deletar') {
        $("#modal-body-text").text("Deseja realmente deletar todos os selecionados?");
        $("#modalYes").attr("onClick", "deletarSelecionados()");
    }
    $("#modal").modal('show');
}
 
function exibir(elemento) {
    if (elemento === "vagas") {
        $(".containerVaga").removeClass('d-none');
        $(".divCurriculo").addClass('d-none');
        $("#controleDeVagas").addClass('d-none');
    } else {
        $(".containerVaga").addClass('d-none');
        $(".divCurriculo").removeClass('d-none');
        $("#controleDeVagas").removeClass('d-none');
    }
}

function adicionarMotivoUnico(chamador, curriculoId) {
    $("#divMotivo").removeClass('d-none');
    
    if (chamador === "arquivar") {
        $("#confirmarMotivo").attr("onClick", `arquivarCurriculo('${curriculoId}')`);
    } else if (chamador === "deletar") {
        $("#confirmarMotivo").attr("onClick", `deletarCurriculo('${curriculoId}')`);
    }
}

function adicionarMotivoMultiplo(chamador) {
    $("#divMotivo").removeClass('d-none');
    $("#confirmarMotivo").attr("onClick", `mostrarModal('${chamador}')`);
}
 
function removerVaga(vagaId) {
    $.ajax({
        type: 'DELETE',
        url: 'recrutador/deletarVaga/' + vagaId
    });
}
 
function arquivarCurriculo(curriculoId) {
    motivo = $("#motivo").val();
    $.ajax({
        type: 'PUT',
        url: 'curriculo/' + curriculoId + '/arquivar/',
        data: {
            motivo
        }
    });
}
 
function desarquivarCurriculo(curriculoId) {
    $.ajax({
        type: 'PUT',
        url: 'curriculo/' + curriculoId + '/desarquivar/'
    });
}
 
function deletarCurriculo(curriculoId) {
    motivo = $("#motivo").val();
    $.ajax({
        type: 'DELETE',
        url: 'curriculo/' + curriculoId,
        data: {
            motivo
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