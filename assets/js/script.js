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
  }
}