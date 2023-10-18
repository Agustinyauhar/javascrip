function gen_table() {
    document.getElementById("tab").innerHTML = "";
    let n = Number(document.getElementById("capital").value);
    let n2 = Number(document.getElementById("couta").value);
    let n3 = Number(document.getElementById("interes").value);

    if (n > 0 && n2 > 0 && n3 > 0) {
        let cuotas = [];
        let t_i = 0;
        let t_p = 0;

        for (let i = 1; i <= n2; i++) {
            let ca = n / n2;
            let d1 = ca.toFixed(2);
            let i2 = ((n * n3) / 100) / n2;
            let d2 = i2.toFixed(2);
            let r = ca + i2;
            let d3 = r.toFixed(2);
            cuotas.push([i, d1, d2, d3]);

            t_i += i2;
            t_p += r;
        }

        let tabBody = document.getElementById("tab");
        for (let i = 0; i < cuotas.length; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < cuotas[i].length; j++) {
                let cell = document.createElement("td");
                cell.textContent = cuotas[i][j];
                row.appendChild(cell);
            }
            tabBody.appendChild(row);
        }

        let n1 = n.toFixed(2);
        let d4 = t_i.toFixed(2);
        let d5 = t_p.toFixed(2);

        document.getElementById("t1").textContent = n1;
        document.getElementById("t2").textContent = d4;
        document.getElementById("t3").textContent = d5;
    } else {
        alert("Falta ingresar un número válido en todos los campos");
    }
}