import {getDataContinents} from "../components/continents.js";

window.addEventListener('load', async () => {
    await createTableContinents();
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
        tableDataEdit.appendChild(buttonComponent('Editar'));
        tableDataDelete.appendChild(buttonComponent('Eliminar'));
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
const buttonComponent = (buttonLabel) => {
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.appendChild(document.createTextNode(buttonLabel));
    return button;
}; 