function salvartask() {
  task = document.getElementById("input-add-task").value;
  document.getElementById("input-add-task").value = "";

  const taskId = new Date().getTime();

  const novaTarefa = {
    id: taskId,
    task: task,
    status: "pendente",
  };

  let tarefasArmazenadas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasArmazenadas.push(novaTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefasArmazenadas));

  mostrarTarefas();
}

function mostrarTarefas() {
  let tarefasArmazenadas = JSON.parse(localStorage.getItem("tarefas")) || [];

  document.getElementById("list-pendente").innerHTML = "";
  document.getElementById("list-concluida").innerHTML = "";
  document.getElementById("list-all").innerHTML = "";

  tarefasArmazenadas.forEach((tarefa) => {
    const conteudoLi = document.createElement("li");
    conteudoLi.innerHTML = tarefa.task;

    const btn_close = document.createElement("button");
    btn_close.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
        `;
    btn_close.classList.add("btn-excluir");

    btn_close.addEventListener("click", function () {
      tarefasArmazenadas = tarefasArmazenadas.filter(
        (item) => item.id !== tarefa.id
      );
      localStorage.setItem("tarefas", JSON.stringify(tarefasArmazenadas));
      mostrarTarefas();
    });

    const btn_concluir = document.createElement("button");
    btn_concluir.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
        `;
    btn_concluir.classList.add("btn-concluir");

    btn_concluir.addEventListener("click", function () {
      tarefa.status = "concluída";
      localStorage.setItem("tarefas", JSON.stringify(tarefasArmazenadas));
      mostrarTarefas();
    });
    const conteudoLi2 = document.createElement("li");
    conteudoLi2.innerHTML = tarefa.task;
    document.getElementById("list-all").appendChild(conteudoLi2);
    conteudoLi.appendChild(btn_concluir);
    conteudoLi.appendChild(btn_close);
    conteudoLi.classList.add("task-pendente")

    if (tarefa.status === "pendente") {
      document.getElementById("list-pendente").appendChild(conteudoLi);
    } else {
      document.getElementById("list-concluida").appendChild(conteudoLi);
      btn_close.classList.remove("btn-excluir")
      btn_close.classList.add("btn-excluir2")
      conteudoLi.removeChild(btn_concluir);
      conteudoLi.classList.remove("task-pendente")
      conteudoLi.classList.add("task-concluida")
    }
  });

}

addEventListener("DOMContentLoaded", () => {
  mostrarTarefas();
});
