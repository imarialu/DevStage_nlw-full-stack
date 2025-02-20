const app = document.getElementById("app"); // Irá pegar o elemento pelo Id 
const users = [
    {
        email: 'test@test.com',
        phone: '999999999',
        ref: 100,
        refBy: null
    },
    {
        email: 'tust@tust.com',
        phone: '999999999',
        ref: 200,
        refBy: 100
    }
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email // Caso encontre usuário, será retornado o mesmo
    });
}

const showInvite = (userData) => {
    app.innerHTML = `
    <input type="text" id="link" value="https://evento.com" disabled>
    <div id="stats">
        <h4>
            80
        </h4>
        <p>
            Inscrições feitas
        </p>
    </div>
    `
}

const formAction = () => {
    const form = document.getElementById("form") // Pegará o form pelo Id
    form.onsubmit = (event) => { // A função só será executada quando clicarem no botão
        event.preventDefault() // "Evite o padrão", ou seja, o formulário não será executado
        const formData = new FormData(form) // Pega os atributos de name em um form
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUser(userData)
        if(user){
            showInvite(user)
        }else{

        }
    }
}

const startApp = () => {
    const content = `
    <form id="form">
        <input type="email" name="email" placeholder="E-mail"/>
        <input type="text" name="phone" placeholder="Telefone"/>
        <button> Confirmar </button>
    </form>
    `

    app.innerHTML = content; // app é igual a content, ou seja, a div receberá a estrutura HTML

    formAction();
}

startApp(); // Inicia a aplicação