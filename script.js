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
    <main>
        <h3>Inscrição Confirmada</h3>

        <p>
            Convide mais pessoas e concorra a prêmios! <br>
            Compartilhe o link e acompanhe as inscrições:
        </p>

        <div class="input-group">
            <label for="link">
                <img src="link.svg" alt="Link icon">
            </label>
            <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
        </div>
    </main>

   <section class="stats">
        <h4>
            ${getTotalsSubscribers(userData)}
        </h4>
        <p>Inscrições feitas</p>
   </section>
    `

    app.setAttribute('class', 'page-invite')
    updateImageLinks()
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

const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute("src"); 
      if (src && !src.startsWith("http")) {  
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
      }
    });
  };

const startApp = () => {
    const content = `
        <main>
            <section class="about">
                <div class="section-header">
                    <h2>
                        Sobre o evento
                    </h2>
                    <span class="badge">AO VIVO</span>
                </div>

                <p>
                    Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                    <br><br>
                    Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
                </p>
            </section>

            <section class="registration">
                <h2>Inscrição</h2>

                <form id="form">
                    <div class="input-wrapper">
                        <div class="input-group">
                            <label for="email">
                                <img src="mail.svg" alt="E-mail icon">
                            </label>
                            <input type="email" name="email" id="email" placeholder="E-mail">
                        </div>

                        <div class="input-group">
                            <label for="phone">
                                <img src="phone.svg" alt="Phone icon">
                            </label>
                            <input type="text" name="phone" id="phone" placeholder="Telefone">
                        </div>
                    </div>

                    <button> 
                        Confirmar 
                        <img src="arrow.svg" alt="Arrow right">
                    </button>
                </form>
            </section>
        </main>
    `

    app.innerHTML = content // app é igual a content, ou seja, a div receberá a estrutura HTML
    app.setAttribute('class', 'page-start')
    updateImageLinks()
    formAction()
}

startApp(); // Inicia a aplicação

document.querySelector("header").onclick = () => startApp()