
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1BnAY8Lzg38iqujmCj5f0gPx8J8gRlS6z5g0_OoLXojk/pubhtml';

function init() {
   Tabletop.init( { key: publicSpreadsheetUrl,
                    callback: showInfo,
                    simpleSheet: false } )
 }

function showInfo(data, tabletop) {
 // do something with the data
 console.log(JSON.stringify(data, null, 2));
}

//initialise and kickstart the whole thing.
init()

// Função para exibir os dados na tabela
function showInfo(data) {
    const tabela = document.querySelector('#tabelaGamificacao tbody');
    tabela.innerHTML = '';  // Limpa a tabela antes de atualizar

    // Itera pelos dados dos alunos e preenche a tabela
    data.forEach(aluno => {
        const nivel = definirNivel(aluno.Pontos); // Define o nível do aluno
        const row = document.createElement('tr'); // Cria uma nova linha para a tabela

        // Adiciona classes de estilo de acordo com o nível do aluno
        if (nivel === 'Sem Nível') {
            row.classList.add('sem-nivel');
        } else if (nivel === 'Bronze') {
            row.classList.add('bronze');
        } else if (nivel === 'Prata') {
            row.classList.add('prata');
        } else if (nivel === 'Ouro') {
            row.classList.add('ouro');
        }

        // Preenche a linha com os dados do aluno
        row.innerHTML = `
            <td>${aluno.Nome}</td>
            <td>${aluno.Pontos}</td>
            <td>${nivel}</td>
        `;

        // Adiciona a linha à tabela
        tabela.appendChild(row);
    });
}

// Função para definir o nível do aluno com base na pontuação
function definirNivel(pontos) {
    pontos = parseInt(pontos);  // Converte a pontuação para número
    if (pontos >= 0 && pontos <= 16) {
        return 'Sem Nível';
    } else if (pontos >= 17 && pontos <= 90) {
        return 'Bronze';
    } else if (pontos >= 91 && pontos <= 250) {
        return 'Prata';
    } else {
        return 'Ouro';
    }
}

// Chama a função de inicialização quando a página é carregada
window.addEventListener('DOMContentLoaded', init);
