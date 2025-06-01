/*
 * @description: Carrega títulos dos filmes via AJAX
 * @author Aline Reis
 * @date 01/06/2025
 */
var requisicao = new XMLHttpRequest();

requisicao.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var xmlDoc = this.responseXML;
        var titulos = xmlDoc.getElementsByTagName("titulo");

        var lista = "<ul>";
        for (var i = 0; i < titulos.length; i++) {
            var titulo = titulos[i].childNodes[0].nodeValue;
            lista += "<li>" + titulo + "</li>";
        }
        lista += "</ul>";
        document.getElementById("lista-titulos-filmes").innerHTML = lista;

        //Questão 2: Exibir ID, título e ano do segundo filme
        var segundoFilme = xmlDoc.getElementsByTagName("filme")[1];
        var id = segundoFilme.getAttribute("id");
        var titulo2 = segundoFilme.getElementsByTagName("titulo")[0].childNodes[0].nodeValue;
        var ano = segundoFilme.getElementsByTagName("ano")[0].childNodes[0].nodeValue;

        var infoFilme = "ID: " + id + "<br>Título: " + titulo2 + "<br>Ano: " + ano;
        document.getElementById("informacoes-filmes").innerHTML = infoFilme;

        //Questão 3: Acessando o nome do diretor do primeiro filme
        var primeiroFilme = xmlDoc.getElementsByTagName("filme")[0];
        var nomeDiretor = primeiroFilme.getElementsByTagName("diretor")[0].firstChild.nodeValue;
        document.getElementById("primeiro-diretor").innerHTML = "Diretor: " + nomeDiretor;

        //Questão 4: Adcionando um novo filme ao DOM e memória
        var novoFilme = xmlDoc.createElement("filme");
        novoFilme.setAttribute("id", "F004");

        var tituloNovo = xmlDoc.createElement("titulo");
        tituloNovo.appendChild(xmlDoc.createTextNode("Matrix"));
        novoFilme.appendChild(tituloNovo);

        var diretorNovo = xmlDoc.createElement("diretor");
        diretorNovo.appendChild(xmlDoc.createTextNode("Lana Wachowski e Lilly Wachowski"));
        novoFilme.appendChild(diretorNovo);

        var anoNovo = xmlDoc.createElement("ano");
        anoNovo.appendChild(xmlDoc.createTextNode("1999"));
        novoFilme.appendChild(anoNovo);

        var generoNovo = xmlDoc.createElement("genero");
        generoNovo.appendChild(xmlDoc.createTextNode("Ficção Científica"));
        novoFilme.appendChild(generoNovo);

        xmlDoc.getElementsByTagName("filmes")[0].appendChild(novoFilme);

        var confirmacao = "<p><strong>Novo filme adicionado em memória:</strong></p>";
        confirmacao += "<p>ID: F004<br>Título: Matrix<br>Ano: 1999<br>Gênero: Ficção Científica</p>";
        document.getElementById("novo-filme").innerHTML = confirmacao;
    }
    // QUESTÃO 5: Remover o filme com id="F002" do DOM em memória
    var filmesRaiz = xmlDoc.getElementsByTagName("filmes")[0];
    var filmesLista = xmlDoc.getElementsByTagName("filme");
    var filmesArray = Array.from(filmesLista); // evita erro de índice ao remover

    for (var i = 0; i < filmesArray.length; i++) {
        if (filmesArray[i].getAttribute("id" ) === "F002") {
            filmesRaiz.removeChild(filmesArray[i]);
            document.getElementById("resultado-remocao").innerHTML =
                "Filme com id='F002' foi removido com sucesso.";
            break;
        }
    }
    var titulosAtualizados = xmlDoc.getElementsByTagName("titulo");
    var listaAtualizada = "<ul>";
    for (var i = 0; i < titulosAtualizados.length; i++) {
        listaAtualizada += "<li>" + titulosAtualizados[i].childNodes[0].nodeValue + "</li>";
    }
    listaAtualizada += "</ul>";
    document.getElementById("lista-atualizada").innerHTML = "<strong>Filmes atuais:</strong>" + listaAtualizada;

};
requisicao.open("GET", "filmes.xml", true);
requisicao.send();