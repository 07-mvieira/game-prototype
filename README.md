# 🟦squarena🟧
jogo singleplayer simples de sobrevivência

## 🧾 sumário
- [sobre o jogo](#sobre)
- [tecnologias utilizadas](#tec)
- [como jogar](#controles)
- [como executar o projeto](#exe)
- [funcionalidades](#func)
- [prints](#prints)
- [melhorias futuras](#melhorias)
- [créditos](#creditos)

<a name="sobre"/>

## 🟨 sobre o jogo

squarena foi minha tentativa de criar um jogo engajador utilizando tecnologias relativamente mais simples - no caso elementos HTML modificados por JavaScript, ao invés de um elemento <canvas> - mas também com qual eu me identifiquei mais e planejo desenvolver ainda mais no futuro, esse lado mais front-end.

o jogador controla um quadrado azul em um campo genérico, com controles topdown inspirados em jogos como os Zeldas 2D. seu objetivo é sobreviver por 60 segundos enquanto inimigos nascem aleatoriamente. eles são estáticos, mas se tocar neles, o jogador morre. o jogador possui um ataque simples de curta distância que os elimina instantaneamente, mas seu movimento é bem mais limitado enquanto o faz. também há moedas que aparecem aleatoriamente que o jogador pode coletar.

os inimigos derrotados e as moedas coletadas são contadas no canto superior esquerdo da tela. quando o jogador morre ou quando o tempo acaba, esses pontos são mostrados na tela de vitória/derrota.

<a name="tec"/>

## 🖥️ tecnologias utilizadas

tríade básica de desenvolvimento web (HTML/CSS/JavaScript)

<a name="controles"/>

## 🕹️ como jogar

o jogo usa o mouse na navegação das telas, mas tirando isso, é controlado com o teclado

- **setinhas** - caminhar

- **espaço** - atacar

<a name="exe"/>

## 📁 como executar o projeto

1. clicar em Code ---> Download ZIP ---> baixar o arquivo ZIP
2. extrair os arquivos em uma pasta
3. abrir o arquivo "index.html"

<a name="func"/>

## 🚀 funcionalidades

- manipulação de elementos no DOM
- uso de arrays e loops para manipular mais de um elemento ao mesmo tempo
- uso extensivo de objetos
- timers
- RNG
- sistema de colisão básico
- requestAnimationFrame(gameLoop)

<a name="prints"/>

## 📷 prints

![Captura de tela 2025-06-01 013936](https://github.com/user-attachments/assets/8cdc7f7b-6b4c-402a-9b63-b9faca12786f)
![Captura de tela 2025-06-01 013953](https://github.com/user-attachments/assets/b0afd45b-7422-40e1-80c8-833df68b551d)
![Captura de tela 2025-06-01 014205](https://github.com/user-attachments/assets/53192b3e-77bf-4b06-a1c0-3cc9f5b7ad71)
![Captura de tela 2025-06-01 014244](https://github.com/user-attachments/assets/d1d664a7-387b-4540-8de8-927e58f7b24b)
![Captura de tela 2025-06-01 014320](https://github.com/user-attachments/assets/cdef4186-3e7b-4968-bab4-d814b37c3c51)

<a name="melhorias"/>

## 🚧 melhorias futuras

- fazer com que os inimigos lancem projéteis móveis
- melhorar o spawn de inimigos (eles podem nascer em cima do jogador sem que ele possa fazer nada)
- corrigir crescente instabilidade do timer da segunda execução em diante

<a name="creditos"/>

## 👤 créditos

[07-mvieira](https://www.github.com/07-mvieira/) - autora

todas as pessoas das 762474928 páginas do stackexchange que eu pesquisei pra fazer quase tudo

