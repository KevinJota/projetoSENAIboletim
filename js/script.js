let numeroDeAlunosRegistrados = 0;
document.getElementById("Registrar").addEventListener("click", function () {
  if (numeroDeAlunosRegistrados >= 5) {
    alert("Número máximo de alunos atingido!! (5 alunos)");
    return;
  }
  // Obter dados do formulário
  const nome = document.getElementById("nome").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);
  const nota4 = parseFloat(document.getElementById("nota4").value);

  // Calcular média final
  const mediaFinal = calcularMedia([nota1, nota2, nota3, nota4]);

  // Determinar a situação do aluno
  let situacao;

  if (mediaFinal >= 70 && mediaFinal <= 100) {
    situacao = "Aprovado";
  } else if (mediaFinal >= 50 && mediaFinal < 70) {
    situacao = "Recuperação";
  } else {
    situacao = "Reprovado";
  }

  // Atualizar a tabela com os resultados
  const tabela = document.querySelector("table");
  const novaLinha = tabela.insertRow(-1);

  const celulaNome = novaLinha.insertCell(0);
  celulaNome.textContent = nome;

  for (let i = 1; i <= 4; i++) {
    const celulaNota = novaLinha.insertCell(i);
    celulaNota.textContent = eval(`nota${i}`);
  }

  const celulaMediaFinal = novaLinha.insertCell(5);
  celulaMediaFinal.textContent = mediaFinal.toFixed(2);

  const celulaSituacao = novaLinha.insertCell(6);
  celulaSituacao.textContent = situacao;

  // Atualizar média geral da turma
  const medias = Array.from(tabela.querySelectorAll("tr td:nth-child(6)")).map((cell) =>
    parseFloat(cell.textContent)
  );

  const mediaGeralTurma = calcularMedia(medias);
  document.getElementById(
    "MédiaTurma"
  ).textContent = mediaGeralTurma.toFixed(1);

  // Atualizar alunos abaixo da média geral
  const alunosAbaixoMediaGeral = Array.from(tabela.rows)
    .filter((row, index) => index !== 0 && parseFloat(row.cells[5].textContent) < mediaGeralTurma)
    .map((row) => row.cells[0].textContent);

  document.getElementById("AlunosmédiaAbaixo").textContent = alunosAbaixoMediaGeral.join(", ");
  numeroDeAlunosRegistrados++;
  if (numeroDeAlunosRegistrados >= 5) {
    document.getElementById("Registrar").disabled = true;
  }

  switch (situacao) {
    case "Aprovado":
      celulaSituacao.style.backgroundColor = "green";
      celulaSituacao.style.color = "black";
      break;
    case "Recuperação":
      celulaSituacao.style.backgroundColor = "yellow";
      celulaSituacao.style.color = "black";
      break;
    case "Reprovado":
      celulaSituacao.style.backgroundColor = "red";
      celulaSituacao.style.color = "black";
      break;
    default:
      break;
  }
});
  
  // Função para calcular a média de um array de notas
  function calcularMedia(notas) {
    const soma = notas.reduce((total, nota) => total + nota, 0);
    return soma / notas.length;
  }


  function limitarValor(input) {
    let min = parseInt(input.min);
    let max = parseInt(input.max);
    
    let valor = parseInt(input.value);
    
    // Verifica se o valor está dentro do limite colocado
    if (valor < min) {
        input.value = min; 
    } else if (valor > max) {
        input.value = max; 
    }
}
  