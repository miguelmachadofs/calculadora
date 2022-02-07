let valor = ''
let finalResult = 0
let operador = []
let inputAux = ''
let popularModalResult = false
let calcPrevio = 1
let botaoIgualFoiAtivado = false
let arrayInputAux = []

const input = document.getElementById('input-result')
const modal = document.getElementById('modal-result')

window.onload = function () {
  input.focus()
}

function reset() {
  input.value = ''
  inputAux = ''
  modal.textContent = ''
  finalResult = 0
  operador = []
  popularModalResult = false
  botaoIgualFoiAtivado = false
  arrayInputAux = []

  input.focus()
}

function validarInput(teclado) {
  if (
    !(valor === '+' || valor === '-' || valor === '/' || valor === 'x') &&
    !(
      valor === '1' ||
      valor === '2' ||
      valor === '3' ||
      valor === '4' ||
      valor === '5' ||
      valor === '6' ||
      valor === '7' ||
      valor === '8' ||
      valor === '9' ||
      valor === '0' ||
      valor === '.'
    ) &&
    !(valor === '(' || valor === ')') &&
    teclado
  ) {
    reset()
    input.value = 'ERRO'
    return false
  } else if (
    !(
      input.value.includes('+') ||
      input.value.includes('-') ||
      input.value.includes('/') ||
      input.value.includes('x') ||
      input.value.includes('1') ||
      input.value.includes('2') ||
      input.value.includes('3') ||
      input.value.includes('4') ||
      input.value.includes('5') ||
      input.value.includes('6') ||
      input.value.includes('7') ||
      input.value.includes('8') ||
      input.value.includes('9') ||
      input.value.includes('0') ||
      input.value.includes('.') ||
      input.value.includes('(') ||
      input.value.includes(')')
    )
  ) {
    input.value = ''
  }
  return true
}

function validarEntradaParaInputVazio(igualBotao = false) {
  if (input.value === '') {
    if (
      valor === '+' ||
      valor === '-' ||
      valor === '/' ||
      valor === 'x' ||
      igualBotao
    ) {
      return false
    }
  }
  return true
}

function validarCasaDecimal() {
  let include = inputAux.includes('.')
  if (valor === '.' && include) {
    return false
  }
  return true
}

function verificarEntradaAposBotaoIgualAtivo() {
  if (
    botaoIgualFoiAtivado &&
    !(valor === '+' || valor === '-' || valor === '/' || valor === 'x') &&
    operador.length === 0
  ) {
    reset()
  }
}

function verificarEntradaDuplaDeOperadores() {
  if (
    (valor === '+' || valor === '-' || valor === '/' || valor === 'x') &&
    inputAux === ''
  ) {
    if (operador[operador.length - 1] !== valor) {
      let index = input.value.length
      let substring = input.value.substring(0, index - 1)
      substring += valor
      input.value = substring
      operador[operador.length - 1] = valor
    }
    return false
  }
  return true
}

function calcMultDivCalcResultadoPrevio(calcPrevioAux, op) {}

function calcularResultadoPrevio() {
  let calcPrevioAux = finalResult
  let op = operador[operador.length - 1]
  if (op === '+') {
    return (calcPrevioAux += parseFloat(inputAux))
  } else if (op === '-') {
    return (calcPrevioAux -= parseFloat(inputAux))
  } else {
    return calcMultDivCalcResultadoPrevio(calcPrevioAux, op)
  }
}

function calcMultDivFinalResult() {}

function finalResultCalc() {
  let op = operador[operador.length - 2]
  if (op === '+') {
    finalResult += parseFloat(inputAux)
  } else if (op === '-') {
    finalResult -= parseFloat(inputAux)
  } else {
    finalResult = calcMultDiv(op)
  }
}

function inserirValor(valorEntrada, teclado = false) {
  // armazenar valor de entrada
  if (teclado) {
    valor = valorEntrada.key
  } else {
    valor = valorEntrada
  }

  // validações
  if (
    !validarInput(teclado) ||
    !validarEntradaParaInputVazio() ||
    !validarCasaDecimal() ||
    !verificarEntradaDuplaDeOperadores()
  ) {
    return
  }
  verificarEntradaAposBotaoIgualAtivo()

  // inserir valores
  if (valor === '+' || valor === '-' || valor === '/' || valor === 'x') {
    operador.push(valor)
    if (modal.textContent === '') {
      finalResult = parseFloat(input.value)
      if (!teclado) {
        input.value += operador[0]
      }
      popularModalResult = true
    } else {
      finalResultCalc()
      if (!teclado) {
        input.value += operador[operador.length - 1]
      }
      modal.textContent = ''
    }

    if (arrayInputAux.length !== operador.length && inputAux !== '') {
      arrayInputAux.push(inputAux)
    } else {
      arrayInputAux[arrayInputAux.length - 1] = inputAux
    }
    inputAux = ''
  } else if (valor === '.') {
    if (input.value === '') {
      if (!teclado) {
        input.value = '0.'
      } else {
        input.value = '0'
      }
      inputAux = '0.'
    } else if (inputAux === '') {
      if (!teclado) {
        input.value += '0.'
      } else {
        input.value += '0'
      }
      inputAux += '0.'
      modal.textContent = `${finalResult}`
    } else {
      if (!teclado) {
        input.value += valor
      }
      inputAux += valor
    }
  } else {
    if (!teclado) {
      input.value += valor
    }
    inputAux += valor
    if (popularModalResult) {
      calcPrevio = calcularResultadoPrevio()
      modal.textContent = `${calcPrevio}`
    }
  }

  input.focus()
}

function botaoIgual() {
  if (
    valor === operador[operador.length - 1] ||
    operador.length === 0 ||
    !validarEntradaParaInputVazio(true)
  ) {
    return
  }

  arrayInputAux.push(inputAux)

  reset()
  finalResult = calcPrevio
  input.value = `${finalResult}`

  botaoIgualFoiAtivado = true
}

function botaoApagar() {
  if (input.value !== '') {
    let index = input.value.length
    let ultimoCaracter = input.value.charAt(index - 1)

    if (
      // se for operador
      ultimoCaracter === '+' ||
      ultimoCaracter === '-' ||
      ultimoCaracter === '/' ||
      ultimoCaracter === 'x'
    ) {
      input.value = input.value.slice(0, index - 1)
      inputAux = arrayInputAux[arrayInputAux.length - 1]

      operador.pop()
      if (operador.length !== 0) {
        modal.textContent = `${finalResult}`

        if (operador.length === 1) {
          finalResult = parseFloat(arrayInputAux[0])
        } else {
          if (operador[operador.length - 1] === '+') {
            finalResult -= parseFloat(inputAux)
          } else if (operador[operador.length - 1] === '-') {
            finalResult += parseFloat(inputAux)
          } else if (operador[operador.length - 1] === '/') {
            finalResult *= parseFloat(inputAux)
          } else {
            finalResult /= parseFloat(inputAux)
          }
        }
      } else {
        popularModalResult = false
      }
    } else {
      // se for número ou ponto
      let inputAuxApagado = inputAux.slice(0, inputAux.length - 1)
      inputAux = inputAuxApagado

      if (index === 1) {
        input.value = ''
      } else {
        input.value = input.value.slice(0, index - 1)
      }

      if (ultimoCaracter !== '.') {
        if (
          popularModalResult &&
          !(
            (input.value.includes('+') ||
              input.value.includes('-') ||
              input.value.includes('/') ||
              input.value.includes('x')) &&
            inputAux === ''
          )
        ) {
          calcPrevio = calcularResultadoPrevio()
          modal.textContent = `${calcPrevio}`
        } else {
          modal.textContent = ''
        }
      }
    }

    if (input.value === '') {
      reset()
    }

    input.focus()
  }
}
