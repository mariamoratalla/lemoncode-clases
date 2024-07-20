import { Reserva, reservas } from "./modelo";

const _IVA = 0.21;
const _PERSONA_ADICIONAL = 40;

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

      subtotal += precioNoche * reserva.noches;
    });

    return subtotal;
  }

  calcularIva(subtotal: number): number {
    return (subtotal += subtotal * _IVA);
  }
}

const calcularImporte = new ImporteReserva(reservas);
console.log(calcularImporte);
console.log(calcularImporte.calcularSubtotal());
console.log(calcularImporte.calcularIva(calcularImporte.calcularSubtotal()));
