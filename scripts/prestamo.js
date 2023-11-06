/* Función para cargar datos desde un archivo JSON local*/
function cargarDatosDesdeJSON() {
    fetch("datos.json")  
        .then((response) => response.json())
        .then((data) => {
            /* Mostrar la tabla de amortización en el DOM*/
            displayAmortizationTable(data.cuotas);

            /*Mostrar los totales en el DOM*/
            document.getElementById("t1").textContent = data.totalInteres.toFixed(2);
            document.getElementById("t2").textContent = data.totalPagar.toFixed(2);
            document.getElementById("t3").textContent = data.totalInteres.toFixed(2);
        })
        .catch((error) => {
            console.error("Error al cargar datos desde JSON: " + error);
        });
}

/*Función para mostrar la tabla de amortización en el DOM*/ 
function displayAmortizationTable(data) {
    let tabBody = document.getElementById("tab");
    tabBody.innerHTML = "";

    data.forEach((row) => {
        let newRow = document.createElement("tr");
        for (let key in row) {
            let cell = document.createElement("td");
            cell.textContent = row[key];
            newRow.appendChild(cell);
        }
        tabBody.appendChild(newRow);
    });
}

/*Función para calcular y mostrar la tabla de amortización*/
function gen_table() {
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
            cuotas.push({ Cuota: i, Capital: d1, Interes: d2, Importe: d3 });

            t_i += i2;
            t_p += r;
        }

        /* Guarda los datos de la simulación en localStorage como JSON*/ 
        localStorage.setItem("simulacion", JSON.stringify(cuotas));
        localStorage.setItem("totalInteres", t_i);
        localStorage.setItem("totalPagar", t_p);

        /*Mostrar la tabla de amortización en el DOM*/
        displayAmortizationTable(cuotas);

        /*  Mostrar los totales en el DOM*/
        document.getElementById("t1").textContent = n.toFixed(2);
        document.getElementById("t2").textContent = t_i.toFixed(2);
        document.getElementById("t3").textContent = t_p.toFixed(2);
    } else {
        alert("Falta ingresar un número válido en todos los campos");
    }
}

/* Evento para cargar datos almacenados al cargar la página*/
window.onload = function () {
    cargarDatosDesdeJSON();
};