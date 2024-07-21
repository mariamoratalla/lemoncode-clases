# LABORATORIO CLASES

## ¿Cómo abrir el proyecto?

Pasos:

- Clónatelo.
- Instala las dependencias con `npm install`.
- Ejecuta el sandbox con `npm run dev`.
- Abre el navegador en `http://localhost:5173/` (si ese puerto no te funciona, mira en la consola donde has hecho el build, puede que este ocupado y se haya abierto en otro puerto).

## Descripción
En este laboratorio simulamos que tenemos una web de reservas de hotel. Cuando un cliente realiza sus reservas, indica los siguientes datos:

- Qué habitaciones quiere (hay de varios tipos).
- Para cada habitación, cuántas personas la van a ocupar. Si hay más de una persona, por cada persona adicional, el coste aumentaría 40€.
- Si quiere desayuno incluido o no. El desayuno tendría un coste de 15€ por persona y noche.

Además, el IVA que aplica a las habitaciones de hotel es del 21%.

La app se encarga de crear una clase que reciba la lista de reservas y calcule el coste subtotal y el total de la reserva.

Hay dos tipos de reservas:

### Cliente Particular
Los dos tipos de habitaciones que hay (Standard y Suite) tienen diferentes precios.

### Tour Operador
Todas las habitaciones tienen el mismo precio.

Además, los servicios contratados tienen un descuento del 15%.

## Modo de trabajo
Se ha creado una clase base para calcular el importe por reserva. Finalmente también se han creado dos clases que heredan de la base teniendo en cuenta las especialidadeds de cada tipo de cliente.

