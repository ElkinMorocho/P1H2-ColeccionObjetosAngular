import { Injectable } from '@angular/core';
import { Estudiante } from '../Entidades/Estudiantes';

@Injectable({
  providedIn: 'root'
})
export class TLista {
  private estudiantes: Estudiante[] = [];

  agregarEstudiante(estudiante: Estudiante): void {
    this.estudiantes.push(estudiante);
  }

  listarEstudiantes(): Estudiante[] {
    return this.estudiantes;
  }

  modificarEstudiante(codigo: string, nuevosDatos: Partial<Estudiante>): boolean {
    const estudiante = this.estudiantes.find(e => e.codigo === codigo);
    if (estudiante) {
      Object.assign(estudiante, nuevosDatos);
      estudiante.calcularCalificacionFinal();
      if (estudiante.examenRecuperacion !== undefined) {
        estudiante.calcularNotaDefinitiva(estudiante.examenRecuperacion);
      }
      return true;
    }
    return false;
  }

  eliminarEstudiante(codigo: string): boolean {
    const index = this.estudiantes.findIndex(e => e.codigo === codigo);
    if (index !== -1) {
      this.estudiantes.splice(index, 1);
      return true;
    }
    return false;
  }

  calcularEstadisticas() {
    const totalEstudiantes = this.estudiantes.length;
    const aprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado').length;
    const reprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Reprobado').length;
    const aprobadosMasculino = this.estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado' && e.sexo === 'M').length;
    const aprobadosFemenino = this.estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado' && e.sexo === 'F').length;

    const porcentajeAprobados = (aprobados / totalEstudiantes) * 100;
    const porcentajeReprobados = (reprobados / totalEstudiantes) * 100;
    const porcentajeAprobadosMasculino = (aprobadosMasculino / totalEstudiantes) * 100;
    const porcentajeAprobadosFemenino = (aprobadosFemenino / totalEstudiantes) * 100;

    const sumaNotas = this.estudiantes.reduce((sum, e) => sum + (e.notaDefinitiva ?? e.calificacionFinal ?? 0), 0);
    const promedioGeneral = sumaNotas / totalEstudiantes;

    const estudiantesMayorPromedio = this.estudiantes.filter(e => (e.notaDefinitiva ?? e.calificacionFinal ?? 0) > promedioGeneral);

    return {
      porcentajeAprobados,
      porcentajeReprobados,
      porcentajeAprobadosMasculino,
      porcentajeAprobadosFemenino,
      promedioGeneral,
      estudiantesMayorPromedio
    };
  }
}