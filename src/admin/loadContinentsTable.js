import {getDataContinents} from "../components/continents.js";

window.addEventListener('load', async () => {
    const sessionToken = sessionStorage.getItem("accessToken");
    if(sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null'){
        await createTableContinents();
        document.querySelectorAll(".button-Editar").forEach(button => {
            button.addEventListener("click", (event) =>{
                const continentId = event.target.id;
                location.href = `editContinent.html?continentId=${continentId}`;
            });
        });

        document.querySelectorAll(".button-Eliminar").forEach(button => {
            button.addEventListener("click", async (event) =>{
                const continentId = event.target.id;
                const userResponse = confirm("Está seguro que desea eliminar el Continente?");
                if(userResponse){
                    await deleteContinent(continentId);
                    alert('Continent Eliminado Correctamente.');
                    location.href = 'indexAdmin.html';
                }
            });
        });
    } else {
        alert("Por favor Iniciar Sesión");
        location.href = "../login.html"
    }
});

/**
 * Create dynamic Continents Table
 */
const createTableContinents = async () => {
    const data = await getDataContinents();
    const container = document.getElementById('table_container');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const tableHeadId = document.createElement('th');
    const tableHeadName = document.createElement('th');
    const tableHeadPercent = document.createElement('th');
    const tableHeadEdit = document.createElement('th');
    const tableHeadDelete = document.createElement('th');
    tableHeadId.appendChild(document.createTextNode('Id'));
    tableHeadName.appendChild(document.createTextNode('Nombre Continente'));
    tableHeadPercent.appendChild(document.createTextNode('Porcentaje'));
    tableHeadEdit.appendChild(document.createTextNode('Editar'));
    tableHeadDelete.appendChild(document.createTextNode('Eliminar'));
    tableHeadRow.appendChild(tableHeadId);
    tableHeadRow.appendChild(tableHeadName);
    tableHeadRow.appendChild(tableHeadPercent);
    tableHeadRow.appendChild(tableHeadEdit);
    tableHeadRow.appendChild(tableHeadDelete);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    table.appendChild(createRows(data));
    table.setAttribute('class', 'table');
    container.appendChild(table);
};

/**
 * 
 * @param {*} data Data About Continents Info
 * @returns 
 */
const createRows = (data) => {
    const tableBody = document.createElement("tbody");
    data.forEach(element => {
        const tableRow = document.createElement("tr");
        const tableDataId = document.createElement("td");
        const tableDataName = document.createElement("td");
        const tableDataPercent = document.createElement("td");
        const tableDataEdit = document.createElement("td");
        const tableDataDelete = document.createElement("td");
        tableDataId.appendChild(document.createTextNode(element._id));
        tableDataName.appendChild(document.createTextNode(element.continentName));
        tableDataPercent.appendChild(document.createTextNode(`${element.continentCoverage}%`));
        tableDataEdit.appendChild(buttonComponent('Editar', element._id));
        tableDataDelete.appendChild(buttonComponent('Eliminar', element._id));
        tableRow.appendChild(tableDataId);
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataPercent);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);
        tableBody.appendChild(tableRow);
    });
    return tableBody;
};

/**
 * 
 * @param {*} buttonLabel 
 * @returns 
 */
const buttonComponent = (buttonLabel, id) => {
    const button = document.createElement('button');
    button.setAttribute('class', `button button-${buttonLabel}`);
    button.setAttribute('id', id);
    button.appendChild(document.createTextNode(buttonLabel));
    return button;
}; 


const deleteContinent = async (id) => {
    try {
        const sessionToken = sessionStorage.getItem("accessToken");
        let response = await fetch(`http://localhost:3000/api/continents/${id}`, 
            {
                method: 'DELETE', // Especifica el tipo de solicitud como PUT
                headers: {
                    'Content-Type': 'application/json', // Especifica que el contenido es JSON
                    'Authorization': `${sessionToken}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};