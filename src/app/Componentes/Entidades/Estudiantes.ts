export class Estudiante {
    codigo: string;
    cedula: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;
    parcial1: number;
    parcial2: number;
    examenRecuperacion?: number; // Opcional
    calificacionFinal?: number;
    notaDefinitiva?: number;
    estadoAprobatorio?: string; // "Aprobado" o "Reprobado"
  
    constructor(
      codigo: string,
      cedula: string,
      nombres: string,
      apellidos: string,
      sexo: string,
      fechaNacimiento: string,
      parcial1: number,
      parcial2: number,
      examenRecuperacion?: number,
      notaDefinitiva?: number,
      estadoAprobatorio?: string
    ) {
      this.codigo = codigo;
      this.cedula = cedula;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.sexo = sexo;
      this.fechaNacimiento = fechaNacimiento;
      this.parcial1 = parcial1;
      this.parcial2 = parcial2;
      this.examenRecuperacion = examenRecuperacion;
      this.notaDefinitiva = notaDefinitiva;
      this.estadoAprobatorio = estadoAprobatorio;
      this.calcularCalificacionFinal();
    }
  
    public calcularCalificacionFinal(): void {
      this.calificacionFinal = parseFloat(((this.parcial1 + this.parcial2) / 2).toFixed(2));
      if (this.calificacionFinal >= 7) {
        this.estadoAprobatorio = "Aprobado";
        this.notaDefinitiva = this.calificacionFinal;
      } else if (this.calificacionFinal < 5.5) {
        this.estadoAprobatorio = "Reprobado";
        this.notaDefinitiva = this.calificacionFinal;
      } else {
        this.estadoAprobatorio = "Pendiente de Recuperación";
      }
    }
  
    public calcularNotaDefinitiva(examenRecuperacion: number) {
      if (this.calificacionFinal !== undefined && this.calificacionFinal >= 5.5 && this.calificacionFinal < 7) {
        this.notaDefinitiva = parseFloat((this.calificacionFinal * 0.4 + examenRecuperacion * 0.6).toFixed(2));
      } else {
        this.notaDefinitiva = this.calificacionFinal;
      }
  
      // Actualizar el estado del estudiante
      if (this.notaDefinitiva !== undefined && this.notaDefinitiva >= 7) {
        this.estadoAprobatorio = 'Aprobado';
      } else {
        this.estadoAprobatorio = 'Reprobado';
      }
    }
  }