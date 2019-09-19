
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
function showComment () {
  $("#seccion_comentario").removeClass("hidden")
}

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos) 
*/

$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function (data) {
    let newHTML = ''

    $(data).find('comment').each(function () {
      newHTML += `
                <div class="review">
                  <span class="nombre">
                    ${$(this).find("name").text()}
                  </span>
                  <span class="date">
                    ${$(this).find("date").text()}
                  </span>
                  <br>
                `

      newHTML += getStarsSpans($(this).find("stars").text())

      newHTML += `
                  <p>
                    ${$(this).find("text").text()}
                  </p>
                </div>
                `
      
    })

    $('#seccion_reviews').append(newHTML)
  },
  error: function (errorMsg) {
      console.log(errorMsg)
  }
})


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

function publishReview () {
  if ($("#nombre").val() == "" || $("#email").val() == "" || $("#comentario").text() == "") {
    $("#error_comment").removeClass("hidden")
  } else {
    $("#error_comment").addClass("hidden")

    let newHTML = ''
    let stars = $("input[name='rating']:checked").val()

    newHTML += `
                <div class="review">
                  <span class="nombre">
                    ${$("#nombre").val()}
                  </span>
                  <span class="date">
                    Justo ahora
                  </span>
                  <br>
                `

    newHTML += getStarsSpans(stars)

    newHTML += `
                <p>
                  ${$("#comentario").text()}
                </p>
              </div>
              `

    $('#seccion_reviews').append(newHTML)

    limpiar ()

  }
}


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/

function limpiar() {
  $("#seccion_comentario").addClass("hidden")
  $("#error_comment").addClass("hidden")
  $("#nombre").val("")
  $("#email").val("")
  $("#comentario").empty()
  $("input[name='rating']:checked").prop('checked', false)
}


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
