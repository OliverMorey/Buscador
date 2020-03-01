//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function ajaxRequest(url, type, data){
  return $.ajax({
    url: url,
    type: type,
    data: data
  })
}

var bienesRaices = []
var strfiltro = "Todos"
    strfiltroCiudad = ""
    strfiltroTipo = ""
    strfiltroPrecioFrom = ""

function renderBienes(filtro, strfiltroCiudad, strfiltroTipo){
  var bienesRaicesTemplate =  '<div class="card horizontal">' +
                                '<div class="card-image">' +
                                  '<img src="img/home.jpg">' +
                                '</div>' +
                                '<div class="card-stacked">' +
                                  '<div class="card-content">' +
                                    '<div>' +
                                      '<b>Direccion: :Direccion:</b><p></p>' +
                                    '</div>' +
                                    '<div>' +
                                      '<b>Ciudad: :Ciudad:</b><p></p>' +
                                    '</div>' +
                                    '<div>' +
                                      '<b>Telefono: :Telefono:</b><p></p>' +
                                    '</div>' +
                                    '<div>' +
                                      '<b>Código postal: :Codigo_Postal:</b><p></p>' +
                                    '</div>' +
                                    '<div>' +
                                      '<b>Precio: :Precio:</b><p></p>' +
                                    '</div>' +
                                    '<div>' +
                                      '<b>Tipo: :Tipo:</b><p></p>' +
                                    '</div>' +
                                  '</div>' +
                                '<div class="card-action right-align">' +
                                  '<a href="#">Ver más</a>' +
                                '</div>' +
                                '</div>' +
                              '</div>';

   let filtrobienesRaices = []

   let indexCiudad = "Ciudad"
   let indexTipo = "Tipo"
   let indexPrecio = "Precio"

   if (filtro == "Todos") {
     filtrobienesRaices = bienesRaices
   } else {
     if (strfiltroCiudad == "" && strfiltroTipo == "") {
        filtrobienesRaices = bienesRaices.filter(function(e) {
          return parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) >=  parseInt($(".irs-from")[0].innerHTML.substr(1).replace(/ /g, ""))
              && parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) <=  parseInt($(".irs-to")[0].innerHTML.substr(1).replace(/ /g, ""))
        })
    } else {
      if (strfiltroCiudad != "" && strfiltroTipo == "") {
        filtrobienesRaices = bienesRaices.filter(function(e) {
          return parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) >=  parseInt($(".irs-from")[0].innerHTML.substr(1).replace(/ /g, ""))
             && parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) <=  parseInt($(".irs-to")[0].innerHTML.substr(1).replace(/ /g, ""))
             && e[indexCiudad] == strfiltroCiudad
        })
      } if (strfiltroCiudad == "" && strfiltroTipo != "") {
          filtrobienesRaices = bienesRaices.filter(function(e) {
            return parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) >=  parseInt($(".irs-from")[0].innerHTML.substr(1).replace(/ /g, ""))
              && parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) <=  parseInt($(".irs-to")[0].innerHTML.substr(1).replace(/ /g, ""))
              && e[indexTipo] == strfiltroTipo
          })
        } else {
          filtrobienesRaices = bienesRaices.filter(function(e) {
            return parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) >=  parseInt($(".irs-from")[0].innerHTML.substr(1).replace(/ /g, ""))
              && parseInt(e[indexPrecio].substr(1).replace(/,/g, "")) <=  parseInt($(".irs-to")[0].innerHTML.substr(1).replace(/ /g, ""))
              && e[indexCiudad] == strfiltroCiudad && e[indexTipo] == strfiltroTipo
          })
        }
      }
   }

   filtrobienesRaices.forEach((item, i) => {
      var bienesRaicesHTML = bienesRaicesTemplate.replace(':Direccion:', filtrobienesRaices[i].Direccion)
                                                .replace(':Ciudad:', filtrobienesRaices[i].Ciudad)
                                                .replace(':Telefono:', filtrobienesRaices[i].Telefono)
                                                .replace(':Codigo_Postal:', filtrobienesRaices[i].Codigo_Postal)
                                                .replace(':Precio:', filtrobienesRaices[i].Precio)
                                                .replace(':Tipo:', filtrobienesRaices[i].Tipo)
        $('.lista').append(bienesRaicesHTML)
      });

}

function getBienesRaices() {

  var endpoint = '/storage'

  var jqajaxRequest = ajaxRequest(endpoint, 'GET', {})
      .done(function(data){
        bienesRaices = data;
        //console.log(bienes1);
        getCiudadesyTipos();
      })
      .fail(function(err){
        console.log(err)
      })
}

function getCiudadesyTipos() {
    var ciudades = bienesRaices.map(function (ciudad) { return ciudad.Ciudad })
    var tipos = bienesRaices.map(function (tipo) { return tipo.Tipo })

    var ciudades = ciudades.filter(function(item, index, array) {
      return array.indexOf(item) === index;
    })

    var tipos = tipos.filter(function(item, index, array) {
      return array.indexOf(item) === index;
    })

    var ciudadTemplate = '<option value=":valorciudad:">:ciudad:</option>'

    ciudades.forEach((item, i) => {
      var ciudadHtml = ciudadTemplate.replace(':valorciudad:', ciudades[i])
                                     .replace(':ciudad:', ciudades[i])
      $('#ciudad').append(ciudadHtml)
    });

    var tipoTemplate = '<option value=":valortipo:">:tipo:</option>'

    tipos.forEach((item, i) => {
      var tipoHtml = tipoTemplate.replace(':valortipo:', tipos[i])
                                 .replace(':tipo:', tipos[i])
      $('#tipo').append(tipoHtml)
    });
}

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
      strfiltro = "Todos"
    } else {
      this.customSearch = false
      strfiltro = ""
    }
    $('#personalizada').toggleClass('invisible')
    $('.lista').empty()
  })
}

function verTodas(){
  let propiedades =  $('#buscar')
  propiedades.on('click', (e) => {
    $('.lista').empty()
    renderBienes(strfiltro, strfiltroCiudad, strfiltroTipo)
  })
}

function filtroCiudad(){
  let selectCiudad =  $('#ciudad')
  selectCiudad.on('change', (e) => {
    strfiltroCiudad = e.target.value
  })
}

function filtroTipo(){
  let selectTipo =  $('#tipo')
  selectTipo.on('change', (e) => {
    strfiltroTipo = e.target.value
  })
}

setSearch()
getBienesRaices()
filtroCiudad()
filtroTipo()
verTodas()
