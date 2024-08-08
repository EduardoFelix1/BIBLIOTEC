// Array para armazenar os livros
let livros = [];

// Função para carregar os livros do Local Storage ao iniciar a página
function carregarLivros() {
    const livrosSalvos = localStorage.getItem('livros');
    if (livrosSalvos) {
        livros = JSON.parse(livrosSalvos);
        exibirLivros();
    }
}

// Função para salvar os livros no Local Storage
function salvarLivros() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Função para exibir os livros cadastrados
function exibirLivros() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpa os resultados anteriores

    livros.forEach((livro) => {
        const livroDiv = document.createElement('div');
        livroDiv.classList.add('livro'); // Adiciona a classe 'livro'

        const titulo = document.createElement('h3');
        titulo.textContent = livro.titulo;
        livroDiv.appendChild(titulo);

        const autor = document.createElement('p');
        autor.innerHTML = `<span>Autor:</span> ${livro.autor}`;
        livroDiv.appendChild(autor);

        const genero = document.createElement('p');
        genero.innerHTML = `<span>Gênero:</span> ${livro.genero}`;
        livroDiv.appendChild(genero);

        const ano = document.createElement('p');
        ano.innerHTML = `<span>Ano Publicado:</span> ${livro.ano_publicado}`;
        livroDiv.appendChild(ano);

        resultadoDiv.appendChild(livroDiv);
    });
}

// Função para adicionar um novo livro
function adicionarLivro(titulo, autor, genero, ano_publicado) {
    const novoLivro = { titulo, autor, genero, ano_publicado };
    livros.push(novoLivro);
    salvarLivros();  // Salva no Local Storage
    exibirLivros();  // Atualiza a exibição
}

// Função para lidar com o evento de submissão do formulário de cadastro
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano_publicado = document.getElementById('ano_publicado').value;

    if (titulo && autor && genero && ano_publicado) {
        adicionarLivro(titulo, autor, genero, ano_publicado);

        // Limpa os campos do formulário após o cadastro
        document.getElementById('formulario').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para pesquisar livros
function pesquisarLivro(termo) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpa os resultados anteriores

    const livrosFiltrados = livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termo.toLowerCase())
    );

    if (livrosFiltrados.length > 0) {
        livrosFiltrados.forEach((livro) => {
            const livroDiv = document.createElement('div');
            livroDiv.classList.add('livro'); // Adiciona a classe 'livro'

            const titulo = document.createElement('h3');
            titulo.textContent = livro.titulo;
            livroDiv.appendChild(titulo);

            const autor = document.createElement('p');
            autor.innerHTML = `<span>Autor:</span> ${livro.autor}`;
            livroDiv.appendChild(autor);

            const genero = document.createElement('p');
            genero.innerHTML = `<span>Gênero:</span> ${livro.genero}`;
            livroDiv.appendChild(genero);

            const ano = document.createElement('p');
            ano.innerHTML = `<span>Ano Publicado:</span> ${livro.ano_publicado}`;
            livroDiv.appendChild(ano);

            resultadoDiv.appendChild(livroDiv);
        });
    } else {
        resultadoDiv.textContent = 'Nenhum livro encontrado.';
    }
}

// Função para lidar com o evento de busca
document.getElementById('form_pesquisar').addEventListener('submit', function(event) {
    event.preventDefault();
    const termo = document.getElementById('pesquisar').value;
    pesquisarLivro(termo);
});

// Carrega os livros salvos no Local Storage ao iniciar a página
carregarLivros();
