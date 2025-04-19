


async function loadData() {
    try {
        const response = await fetch("http://localhost:3000/api/words") // troque pela URL da sua API
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        //console.log("Resposta da API:", data);
        return data;
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("resposta").innerText = "Erro ao chamar a API.";
        return []; // retorna array vazio se der erro
    }
}

async function createTable() {
    const data = await loadData();
    //console.log("CreateTable ", data)
    const table = document.querySelector(".table-body")
    //console.log(table)
    data.forEach(item => {
        //console.log(item)

        const tr = document.createElement("tr")
        const tdEn = document.createElement("td")
        const tdPt = document.createElement("td")
        tdEn.textContent = item.word
        tdPt.textContent = item.meaning
        tr.appendChild(tdEn)
        tr.appendChild(tdPt)
        //console.log(tr)
        table.appendChild(tr)
    })

}

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault()

    const word = document.getElementById("word").value;
    const meaning = document.getElementById("meaning").value;

    if (word === null || meaning === null) {
        return
    }

    const payload = {
        word: word,
        meaning: meaning
      };

    fetch("http://localhost:3000/api/words", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro na requisição");
            return response.json();
        })
        .then(data => {
            console.log("Resposta da API:", data);
            createTable()     
        })
        .catch(error => {
            console.error("Erro:", error);
        });
});



createTable()