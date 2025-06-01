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
    }
};
requisicao.open("GET", "filmes.xml", true);
requisicao.send();