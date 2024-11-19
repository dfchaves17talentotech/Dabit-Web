const URL_API = 'https://dabit-server.vercel.app';

window.addEventListener('load', ()=>{
    const formLogin = document.getElementById("loginForm");

    formLogin.addEventListener("submit", async (event)=> {
        event.preventDefault(); //Evita que se pierda la información del usuario al no dejar que se recargue la página.
        const userName = document.getElementById('inputLoginEmail').value;
        const password = document.getElementById('inputLoginPassword').value;
        const response = await getDataUser(userName, password);
        const userData = await response.json();
        console.log(userData);
        if (userData.accessToken){
            sessionStorage.setItem("accessToken", userData.accessToken);
            location.href = './admin/indexAdmin.html';
        } else {
            alert("Usuario y/o Contraseña Incorrectos");
            location.href = 'login.html';
        }
    });
});

export const getDataUser = async (userName, password) => {
    try {
        let response = await fetch(`${URL_API}/api/getUsers`, 
            {
                method: 'POST', // Especifica el tipo de solicitud como POST
                headers: {
                    'Content-Type': 'application/json', // Especifica que el contenido es JSON
                },
                body: JSON.stringify({
                    email: userName,
                    password: password,
                }),
            }
        );
        return response;
    } catch (error) {
        console.error('Hubo un error');
    }
}