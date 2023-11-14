# PSI_Practica4A
Practica asignatura arquitectura y Programación de Sistemas en Internet Práctica 4 - Grupo A

## Introduction
Ejemplo de API REST para almacenar los datos de una TARDIS de la serie Doctor Who en una base de datos MongoDB
utilizando typescript, express y mongoose.<p>
![tools](https://skillicons.dev/icons?i=ts,mongodb,express)

## Modelo de datos
El modelo de datos es el siguiente:

<table>
<tr>
  <th>TARDIS</th><th>Dimension :milky_way:</th>
</tr>
<tr>
<td>TARDIS<pre>
{
    name: String,
    camouflage: String,
    regNumber: Number,
    year: Number,
    dimensions: mongoose.Schema.Types.ObjectId
}</pre></td>
<td><pre>
{
    name: String,
    planets: [mongoose.Schema.Types.ObjectId]
}
</pre></td>
</tr>
<tr>
  <th>Planet</th><th>Person</th></tr>
<tr></td>
<td><pre>
{
    name: String,
    persons: [mongoose.Schema.Types.ObjectId]
}
</pre></td>
<td><pre>
{
    name: String
}
</pre></td>
</tr>
</table>

## Endpoints
#### GET

* ```/tardis/``` Obtener los datos de todas las TARDIS existentes en la base de datos
* ```/tardis/:id``` Obtener una TARDIS por su id (incluyendo sus dimensiones, planetas y personas)
* ```/tardis/name/:name``` Obtener una TARDIS por su nombre
* ```/initDB/``` Elimina todos los datos y carga unos datos por defecto

#### POST
* ```/tardis/``` Crear una nueva TARDIS (sin dimensiones)
    * ```body: {name: String, camouflage: String, regNumber: Number, year: Number}```
* ```/tardis/dimension/``` Crear una nueva dimension sin planetas en una TARDIS existente
    * ```body: {name: String, tardisId:ObjectId}```
* ```/tardis/planeta/``` Crear un nuevo planeta en una dimension existente
    * ```body: {name: String, dimensionId:ObjectId}```
* ```/tardis/persona/``` Crear una nueva persona en un planeta existente
    * ```body: {name: String, planetId:ObjectId}```

#### PUT
* ```/tardis/:id``` Actualizar los datos básicos de una TARDIS por su id
    *  ```body: {name: String, camouflage: String, regNumber: Number, year: Number}```
* ```/tardis/dimension/:id``` Actualizar los datos de una dimensión por su id
    * ```body: {name: String}```
* ```/tardis/planeta/:id``` Actualizar los datos de un planeta por su id
    * ```body: {name: String}```
* ```/tardis/persona/:id``` Actualizar los datos de una persona por su id
    * ```body: {name: String}```

#### DELETE
* ```/tardis/:id``` Eliminar una TARDIS por su id (no debe tener dimensiones)
* ```/tardis/dimension/:id``` Eliminar una dimensión por su id (también en su TARDIS, pero no debe tener planetas)
* ```/tardis/planeta/:id``` Eliminar un planeta por su id (también en su dimensión, no debe tener personas)
* ```/tardis/persona/:id``` Eliminar una persona por su id (también en su planeta)

## Variables de entorno
Se incluye un fichero .env con las variables de entorno necesarias:
* ```DB_URI``` URI de la base de datos MongoDB


## Enunciado
Doctor Who cumple 60 años y los episodios especiales están a la vuelta de esquina, así que vamos a hacer un API REST para ayudar a la TARDIS (Time And Relative Dimension In Space) organizarse ante la nueva reiterada llegada de David Tennant.

La Tardis guarda los siguientes datos en sus memorias Gallifreyanas según lo que ha visitado en sus diferentes viajes.
- Dimensiones  --> Con los planetas visitados en la misma
- Planetas --> Con las personas relevantes a las experiencias en el mismo
- Personas
- Actual camuflaje de la TARDIS
- Número de regeneración del Time Lord que la use
- Año en el que se encuentra actualmente
  Las dimensiones, planetas y personas se deberán guardar en diferentes colecciones de mongo atlas y ser relacionadas por id's entre si llegando a una sola final en la que se guarde cada TARDIS.
  El api deberá de poseer llamadas para ver, crear y modificar TARDISs además de todos los elementos de su interior, cada llamada tendrá que ser del método requerido por su funcionalidad.

----------------------------------------------------------------------------------------------------------------------

En el repositorio el readme deberá funcionar como documentación del API indicando todos los endpoints y parámetros necesarios para su uso.

El uso de mongo y la publicación en deno deploy es obligatoria.