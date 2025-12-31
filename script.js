let totalRobux = 0;

function criarRobux() {
    for(let i = 0; i < 15; i++) {
        const robux = document.createElement("div");
        robux.classList.add("robux");
        robux.style.left = Math.random() * window.innerWidth + "px";
        robux.style.animationDuration = 2 + Math.random() * 2 + "s";
        document.getElementById("robux-fall").appendChild(robux);

        setTimeout(() => {
            robux.remove();
        }, 4000);
    }
}

function enviar() {
    const username = document.getElementById("username").value.trim();
    const robux = document.getElementById("robux").value;
    const mensagem = document.getElementById("mensagem");

    mensagem.className = "";

    if (!username || !robux) {
        mensagem.classList.add("error");
        mensagem.innerHTML = "❌ Preencha todos os campos.";
        return;
    }

    if (robux > 300) {
        mensagem.classList.add("error");
        mensagem.innerHTML = "❌ Limite máximo: 300 Robux por dia.";
        return;
    }

    const ultimoEnvio = localStorage.getItem("ultimoEnvio");
    const agora = Date.now();

    if (ultimoEnvio && agora - ultimoEnvio < 86400000) {
        mensagem.classList.add("alert");
        mensagem.innerHTML = "⏳ Você só pode usar novamente após 24 horas.";
        return;
    }

    mensagem.classList.add("alert");
    mensagem.innerHTML = "🔍 Verificando usuário do Roblox...";

    setTimeout(() => {
        if (username.length < 3) {
            mensagem.classList.add("error");
            mensagem.innerHTML = "❌ Usuário do Roblox não encontrado.";
            return;
        }

        mensagem.classList.add("alert");
        mensagem.innerHTML = "⚙️ Processando Robux...";

        setTimeout(() => {
            localStorage.setItem("ultimoEnvio", agora);

            mensagem.classList.add("success");
            mensagem.innerHTML = `
                ✅ Robux enviado com sucesso para o usuário <b>${username}</b>.<br>
                Aguarde no mínimo <b>15 dias</b> para receber.
            `;

            // Atualiza contador
            totalRobux += parseInt(robux);
            document.getElementById("contador").innerText = "Robux acumulados: " + totalRobux;

            // Cria animação de Robux caindo
            criarRobux();

            // Toca som
            document.getElementById("som-robux").play();

        }, 2000);

    }, 2000);
}
