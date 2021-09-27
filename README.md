## Módulo 2: Ejercicio de evaluación final con Javascript.

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite marcar/desmarcar las series como favoritas y guardarlas en local storage.

![](https://github.com/vtendero/series-finder/blob/master/src/images/Readme.JPG)


### Requerimientos para el ejercicio

1. Estructura básica que consta de dos partes:
    - Un campo de texto y un botón para buscar series por su título.
    - Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.
2. La aplicación debe conectarse al API abierto de TVMaze para la búsqueda de series. Las series que no tengan imagen deben mostrar una imagen de relleno.
3. Podrán elegirse las series favoritas. Cuando una serie sea marcada como favorita, deberá cambiar su estilo. Además, las series favoritas deben seguir apareciendo aunque se realice una nueva búsqueda.
4. Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos debe mostrarse.
5. Opción de eliminar favoritos.
6. Maquetación.

### Tecnologías

![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat&logo=javascript&logoColor=yellow)
![Sass](https://img.shields.io/badge/-Sass-black?style=flat&logo=sass)
![html5](https://img.shields.io/badge/-HTML5-black?style=flat&logo=html5)

### Scripts para iniciar el proyecto

Descarga o clona este repositorio.

Necesitas tener instalado Node.js.

Instala dependencias con $ npm install.
```
npm install
```

Ejecuta el proyecto con $ npm start.
```
npm start
```

Para publicar en GitHub Pages
```
npm run docs
```

```
npm run push-docs
```