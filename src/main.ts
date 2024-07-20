import { Reserva, reservas } from "./modelo";

const _IVA = 1.21; //SUMAR 21%
const _PERSONA_ADICIONAL = 40;
const _DESCUENTO = 0.85; //RESTAR 15%

class ImporteReserva {
  reservas: Reserva[];

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  precioPorTipoHabitacion(reserva: Reserva): number {
    const { tipoHabitacion } = reserva;
    return tipoHabitacion === "standard" ? 100 : 150;
  }

  precioPorPersonaAdicional(reserva: Reserva): number {
    const { pax } = reserva;
    return pax > 1 ? pax * _PERSONA_ADICIONAL : 0;
  }

  calcularSubtotal(): number {
    let subtotal: number = 0;

    this.reservas.forEach((reserva) => {
      const precioHabitacion: number = this.precioPorTipoHabitacion(reserva);
      const precioPersona: number = this.precioPorPersonaAdicional(reserva);
      const precioNoche: number = precioHabitacion + precioPersona;

      subtotal += Number((precioNoche * reserva.noches).toFixed(2));
    });

    return subtotal;
  }

  calcularIva(subtotal: number): number {
    return Number((subtotal * _IVA).toFixed(2));
  }
}

const calcularImporte = new ImporteReserva(reservas);
const subtotal = calcularImporte.calcularSubtotal();
console.log(`El subtotal del Caso 1 es: ${subtotal}€`);
console.log(
  `El total del Caso 1 es: ${calcularImporte.calcularIva(subtotal)}€`
);

/* CASO 2 */

class ImporteReservaTourOperador extends ImporteReserva {
  constructor(reservas: Reserva[]) {
    super(reservas);
  }

  calcularSubtotal(): number {
    let subtotal: number = 0;

    this.reservas.forEach((reserva) => {
      const precioHabitacion: number = 100;
      const precioPersona: number = this.precioPorPersonaAdicional(reserva);
      const precioNoche: number = precioHabitacion + precioPersona;

      subtotal += precioNoche * reserva.noches;
    });

    return Number((subtotal * _DESCUENTO).toFixed(2));
  }
}

const calcularImporteTourOperador = new ImporteReservaTourOperador(reservas);
const subtotalTourOperador = calcularImporteTourOperador.calcularSubtotal();
console.log(`El subtotal del Caso Tour Operador es: ${subtotalTourOperador}`);
console.log(
  `El total del Caso Tour Operador es: ${calcularImporteTourOperador.calcularIva(
    subtotalTourOperador
  )}`
);
