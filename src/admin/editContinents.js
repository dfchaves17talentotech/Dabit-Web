
window.addEventListener('load', async ()=>{
    const sessionToken = sessionStorage.getItem("accessToken");
    if(sessionToken !== undefined && sessionToken !== null && sessionToken !== 'null'){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const continetId = urlParams.get("continentId");
        console.log(continetId);
        const data = await getDataContinentsById(continetId);
        console.log(data);
        const idInput = document.getElementById('inputIdContinent');
        const nameInput = document.getElementById('inputNameContinent');
        const percetInput = document.getElementById('inputPercentContinent');
        idInput.value = data._id;
        nameInput.value = data.continentName;
        percetInput.value = data.continentCoverage;

        const formUpdateContinent = document.getElementById("formEditContinent");

        formUpdateContinent.addEventListener("submit", async (event)=> {
            event.preventDefault(); //Evita que se pierda la información del usuario al no dejar que se recargue la página.
            const response = await updateContinentData(nameInput.value, percetInput.value);
            console.log(response);
            alert('Su continente ha sido actualizado correctamente.');
            location.href = 'indexAdmin.html';
        });
    }
});


const getDataContinentsById = async (id) => {
    try {
        const sessionToken = sessionStorage.getItem("accessToken");
        let response = await fetch(`http://localhost:3000/api/continents/${id}`, {
            headers: {
                'Content-Type': 'application/json', // Especifica que el contenido es JSON
                'Authorization': `${sessionToken}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}

const updateContinentData = async (name, coverage) => {
    try {
        const sessionToken = sessionStorage.getItem("accessToken");
        let response = await fetch(`http://localhost:3000/api/continents?continentName=${name}`, 
            {
                method: 'PUT', // Especifica el tipo de solicitud como PUT
                headers: {
                    'Content-Type': 'application/json', // Especifica que el contenido es JSON
                    'Authorization': `${sessionToken}`
                },
                body: JSON.stringify({
                    continentCoverage: coverage,
                }),
            }
        );
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
};

