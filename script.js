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
    },
    {
        email: 'tost@tost.com',
        phone: '999999999',
        ref: 300,
        refBy: 100
    }

]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email // Caso encontre usuário, será retornado o mesmo
    });
}

const getTotalsSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref
    })
    return subs.length
}

const showInvite = (userData) => {
    app.innerHTML = `
    <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    <div id="stats">
        <h4>
            ${getTotalsSubscribers(userData)}
        </h4>
        <p>
            Inscrições feitas
        </p>
    </div>
    `
}

const saveUser = (userData) => {
    const newUser = {
        ...userData, // "Espalha" as informações de usuário (email, phone)
        ref: Math.round(Math.random() = 4000), // Mostrará um numéro aleatório e já arredondado
        refBy: 100
    }

    users.push(newUser) // Adicionará novo usuario ao users
    return newUser
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
            const newUser = saveUser(userData)
            showInvite(newUser)
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

document.getElementById("logo").onclick = () => startApp()