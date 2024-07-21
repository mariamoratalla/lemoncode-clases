import { Reserva, reservas } from "./modelo";

const _IVA = 1.21; //SUMAR 21%
const _PERSONA_ADICIONAL = 40;
const _DESCUENTO = 0.85; //RESTAR 15%

/* CLASE GENERAL */

class ImporteReserva {
  reservas: Reserva[];
  precioStandard: number;
  precioSuite: number;

  constructor(
    reservas: Reserva[],
    precioStandard: number,
    precioSuite: number
  ) {
    this.reservas = reservas;
    this.precioStandard = precioStandard;
    this.precioSuite = precioSuite;
  }

  precioPorTipoHabitacion(tipoHabitacion: string): number {
    return tipoHabitacion === "standard"
      ? this.precioStandard
      : this.precioSuite;
  }

  precioPorPersonaAdicional(reserva: Reserva): number {
    const { pax } = reserva;
    return pax > 1 ? (pax - 1) * _PERSONA_ADICIONAL : 0;
  }

  calcularSubtotal(): number {
    let subtotal: number = 0;

    this.reservas.forEach((reserva) => {
      const precioHabitacion: number = this.precioPorTipoHabitacion(
        reserva.tipoHabitacion
      );
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

/* CASO 1 */

class ImporteReservaClienteParticular extends ImporteReserva {
  constructor(reservas: Reserva[]) {
    const precioStandard = 100;
    const precioSuite = 150;
    super(reservas, precioStandard, precioSuite);
  }
}

const calcularImporte = new ImporteReservaClienteParticular(reservas);
const subtotal = calcularImporte.calcularSubtotal();
console.log(`El subtotal del Cliente Particular es: ${subtotal}€`);
console.log(
  `El total del Cliente Particular es: ${calcularImporte.calcularIva(
    subtotal
  )}€`
);

/* CASO 2 */

class ImporteReservaTourOperador extends ImporteReserva {
  constructor(reservas: Reserva[]) {
    const precioStandard = 100;
    const precioSuite = 100;
    super(reservas, precioStandard, precioSuite);
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
console.log(`El subtotal del Tour Operador es: ${subtotalTourOperador}`);
console.log(
  `El total del Tour Operador es: ${calcularImporteTourOperador.calcularIva(
    subtotalTourOperador
  )}`
);
