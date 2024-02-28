// Modo oscuro 

(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')
  
      if (!themeSwitcher) {
        return
      }
  
      const themeSwitcherText = document.querySelector('#bd-theme-text')
      //const activeThemeIcon = document.querySelector('.theme-icon-active')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      //const svgOfActiveBtn = btnToActive.querySelector('svg').getAttribute('href')
  
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })
  
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')
      //activeThemeIcon.setAttribute('href', svgOfActiveBtn)
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
      if (focus) {
        themeSwitcher.focus()
      }
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
})()

// Lectura de datos JSON  

const Lista = document.getElementById("glosary-list");
const ul = document.querySelector("ul");

const requestURL = "https://ddwduocvina.github.io/glosario-front/db.json";

const request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  const Glosario = request.response;
  mostrarLista(Glosario);
  console.log(Glosario)
};

function mostrarLista(jsonObj) {
  const letras = jsonObj["abecedario"];

  // Lectura de elementos del JSON
  for (let i = 0; i < letras.length; i++) {

    // Letra Glosario Categoría
    const letraGlosario = document.createElement("div");
    letraGlosario.classList.add("col-12","col-lg-6","col-xxl-4","glosary-item");
    const sectionLetraGlosario = document.createElement("section");
    sectionLetraGlosario.classList.add("py-5");
    sectionLetraGlosario.setAttribute("id",letras[i].letra + "-section");
    const tituloLetraGlosario = document.createElement("h2");
    const entradasLetraGlosario = document.createElement("div");
    entradasLetraGlosario.classList.add("accordion","border-0");
    entradasLetraGlosario.setAttribute("id","acordeonDespliegue" + letras[i].letra);

    // Ingreso de la letra
    tituloLetraGlosario.innerHTML = letras[i].letra;

    // Impresión de la Letra Glosario Categoría
    Lista.appendChild(letraGlosario);
    letraGlosario.appendChild(sectionLetraGlosario);
    sectionLetraGlosario.appendChild(tituloLetraGlosario);
    sectionLetraGlosario.appendChild(entradasLetraGlosario);

    // Ingreso de entradas por Letra del Glosario
    const entradaIndividual = letras[i].entradas;

    // Recorrido e impresión de entradas individuales
    for (let j = 0; j < entradaIndividual.length; j++) {
        const itemLista = document.createElement("div");
        itemLista.classList.add("accordion-item","border-0");
        const itemListaHeader = document.createElement("h3");
        itemListaHeader.classList.add("accordion-header","mb-3");
        const itemTituloBoton = document.createElement("button");
        itemTituloBoton.classList.add("accordion-button","border","collapsed");
        itemTituloBoton.setAttribute("type","button");
        itemTituloBoton.setAttribute("data-bs-toggle","collapse");
        itemTituloBoton.setAttribute("data-bs-target","#collapse"+ [j + 1] +"Section"+ letras[i].letra);
        itemTituloBoton.setAttribute("aria-expanded","false");
        itemTituloBoton.setAttribute("aria-controls","collapse"+ [j + 1] +"Section"+ letras[i].letra);
        itemTituloBoton.textContent = entradaIndividual[j].nombre;
        const itemEntrada = document.createElement("div");
        itemEntrada.classList.add("accordion-collapse","collapse");
        itemEntrada.setAttribute("id","collapse"+ [j + 1] +"Section"+ letras[i].letra);
        itemEntrada.setAttribute("data-bs-parent","acordeonDespliegue" + letras[i].letra);
        const itemEntradaDiv = document.createElement("div");
        itemEntradaDiv.classList.add("accordion-body","pb-5");
        itemEntradaDiv.innerHTML = entradaIndividual[j].descripcion;

        // Ingreso de entrada individual
        entradasLetraGlosario.appendChild(itemLista);
        itemLista.appendChild(itemListaHeader);
        itemListaHeader.appendChild(itemTituloBoton);
        entradasLetraGlosario.appendChild(itemEntrada);
        itemEntrada.appendChild(itemEntradaDiv);
    }

  }
}