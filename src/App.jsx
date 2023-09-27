// Importa os módulos Fragment e useState do React.
import { Fragment, useState } from 'react'

// Importa o arquivo CSS App.css para estilizar o componente.
import './App.css'

// Importa imagens (ícones) de papel, pedra e tesoura dos caminhos fornecidos.
import PaperHandTransparent from './assets/moves/paper-hand-transparent.png'
import RockHandTransparent from './assets/moves/rock-hand-transparent.png'
import ScissorHandTransparent from './assets/moves/scissor-hand-transparent.png'

// Inicia a definição do componente React chamado App.
function App() {
  // Declara um estado para armazenar o estado atual do jogo, incluindo as jogadas do computador e do jogador.
  const [currentPlay, setCurrentPlay] = useState({
    computer: '',  // Inicialmente vazio
    player: ''     // Inicialmente vazio
  })

  // Declara um estado para contar o número de vitórias do jogador, do computador e empates.
  const [winnerCounter, setWinnerCounter] = useState({
    player: 0,     // Inicialmente 0
    computer: 0,   // Inicialmente 0
    empate: 0      // Inicialmente 0
  })

  // Declara um estado para armazenar o vencedor atual do jogo.
  const [winner, setWinner] = useState('') // Inicialmente vazio

  // Declara um estado para armazenar as possíveis jogadas do jogo (pedra, papel e tesoura).
  const [possibleMoves, setPossibleMoves] = useState([
    {
      type: 'paper',   // Tipo de jogada: papel
      label: 'Papel', // Rótulo exibido ao jogador: Papel
      wins: 'rock',   // Vence contra: pedra
      loses: 'scissor' // Perde para: tesoura
    },
    {
      type: 'rock',    // Tipo de jogada: pedra
      label: 'Pedra',  // Rótulo exibido ao jogador: Pedra
      wins: 'scissor', // Vence contra: tesoura
      loses: 'paper'   // Perde para: papel
    },
    {
      type: 'scissor',  // Tipo de jogada: tesoura
      label: 'Tesoura', // Rótulo exibido ao jogador: Tesoura
      wins: 'paper',    // Vence contra: papel
      loses: 'rock'     // Perde para: pedra
    }
  ])

  // Função que determina o resultado do jogo com base na jogada do jogador.
  const makeMove = playerMove => {
    const minimumMachineMoveNumber = 1
    const maximumMachineMoveNumber = 3

    // Gera uma jogada aleatória para o computador (1 = papel, 2 = pedra, 3 = tesoura).
    const randomMachineMove =
      Math.floor(
        Math.random() *
          (maximumMachineMoveNumber - minimumMachineMoveNumber + 1)
      ) + minimumMachineMoveNumber

    let machineMoveType = ' '

    // Determina a jogada do computador com base no número aleatório gerado.
    switch (randomMachineMove) {
      case 1:
        machineMoveType = 'paper'
        setCurrentPlay((currentValue) => ({ ...currentValue, computer: 'Papel' }))
        break
      case 2:
        machineMoveType = 'rock'
        setCurrentPlay((currentValue) => ({ ...currentValue, computer: 'Pedra' }))
        break
      case 3:
        machineMoveType = 'scissor'
        setCurrentPlay((currentValue) => ({ ...currentValue, computer: 'Tesoura' }))
        break
    }

    // Determina a jogada do jogador com base na entrada do jogador.
    switch (playerMove) {
      case 'paper':
        
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Papel' }))
        break
      case 'rock':
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Pedra' }))
        break
      case 'scissor':
        setCurrentPlay((currentValue) => ({ ...currentValue, player: 'Tesoura' }))
        break
    }

    // Verifica se houve empate.
    if (machineMoveType === playerMove) {
      setWinner('Empate') // Define o vencedor como "Empate".
      setWinnerCounter((currentCounter) => {
        return ({
          ...currentCounter,
          empate: currentCounter.empate++ // Incrementa o contador de empates.
          })
      })
      return
    }

    // Encontra a jogada do jogador nas possíveis jogadas do jogo.
    const playerMoveValidation = possibleMoves.find(
      currentMove => currentMove.type == playerMove
    )

    // Verifica se o jogador venceu.
    const isPlayerTheWinner = playerMoveValidation.wins === machineMoveType

    if (isPlayerTheWinner) {
      setWinner('Jogador') // Define o vencedor como "Jogador".
      setWinnerCounter((currentCounter) => {
        return ({
          ... currentCounter,
          player: currentCounter.player++ // Incrementa o contador de vitórias do jogador.
        })
      })
      return
    }

    // Se o jogador não venceu, o computador é definido como o vencedor.
    setWinner('Computador')
    setWinnerCounter((currentCounter) => {
      return ({
        ... currentCounter,
        computer: currentCounter.computer++ // Incrementa o contador de vitórias do computador.
      })
    })
  }

  // Renderiza o conteúdo do componente.
  return (
    <Fragment>
      {winner && <h1>{winner}</h1>}

      {currentPlay.player && <p>Jogador: {currentPlay.player}</p>}
      {currentPlay.computer && <p>Computador: {currentPlay.computer}</p>}

      <p>Jogador: {winnerCounter.player}</p>
      <p>Computador: {winnerCounter.computer}</p>
      <p>Empate: {winnerCounter.empate}</p>

      {/* Botões para o jogador fazer sua jogada */}
      <button onClick={() => makeMove('paper')}>
        <img src={PaperHandTransparent} />
      </button>

      <button onClick={() => makeMove('rock')}>
        <img src={RockHandTransparent} />
      </button>

      <button onClick={() => makeMove('scissor')}>
        <img src={ScissorHandTransparent} />
      </button>
    </Fragment>
  )
}

export default App
