import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { Estudiante } from '../Entidades/Estudiantes';
import { TLista } from '../Controlador/TLista';
import { AgregarComponent } from '../agregar/agregar.component'; // Importar AgregarComponent
import { ModificarComponent } from '../modificar/modificar.component'; // Importar ModificarComponent

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, FormsModule, AgregarComponent, ModificarComponent], // Agregar AgregarComponent y ModificarComponent a los imports
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  porcentajeAprobados: number = 0;
  porcentajeReprobados: number = 0;
  porcentajeAprobadosMasculino: number = 0;
  porcentajeAprobadosFemenino: number = 0;
  promedioGeneral: number = 0;
  estudianteMayorNota: Estudiante | null = null;
  mostrarModalAgregar: boolean = false;
  mostrarModalModificar: boolean = false;
  estudianteSeleccionado: Estudiante | null = null;

  constructor(private router: Router, private tLista: TLista) {}

  ngOnInit() {
    this.cargarEstudiantes();
    this.realizarConsultas();
  }

  cargarEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      this.estudiantes = JSON.parse(estudiantesGuardados).map((e: any) => new Estudiante(
        e.codigo,
        e.cedula,
        e.nombres,
        e.apellidos,
        e.sexo,
        e.fechaNacimiento,
        e.parcial1,
        e.parcial2,
        e.examenRecuperacion,
        e.notaDefinitiva,
        e.estadoAprobatorio
      ));
      this.tLista['estudiantes'] = this.estudiantes; // Sincronizar con TLista
    } else {
      const lista = new TLista();
      // Agrega datos simulados para pruebas
      lista.agregarEstudiante(new Estudiante('1', '1234567890', 'Juan', 'Pérez', 'M', '2000-01-01', 8, 9));
      lista.agregarEstudiante(new Estudiante('2', '0987654321', 'Ana', 'García', 'F', '1999-05-15', 6, 5));
      this.estudiantes = lista.listarEstudiantes();
      this.guardarEstudiantes();
    }
  }

  guardarEstudiantes() {
    localStorage.setItem('estudiantes', JSON.stringify(this.estudiantes));
  }

  agregarEstudiante() {
    this.mostrarModalAgregar = true;
  }

  cerrarModalAgregar() {
    this.mostrarModalAgregar = false;
    this.cargarEstudiantes(); // Recargar la lista de estudiantes
    this.realizarConsultas(); // Actualizar consultas después de cerrar el modal
  }

  editarEstudiante(codigo: string) {
    this.estudianteSeleccionado = this.estudiantes.find(e => e.codigo === codigo) || null;
    this.mostrarModalModificar = true;
  }

  cerrarModalModificar() {
    this.mostrarModalModificar = false;
    this.estudianteSeleccionado = null;
    this.cargarEstudiantes(); // Recargar la lista de estudiantes
    this.realizarConsultas(); // Actualizar consultas después de cerrar el modal
  }

  eliminarEstudiante(codigo: string) {
    const index = this.estudiantes.findIndex(e => e.codigo === codigo);
    if (index !== -1) {
      this.estudiantes.splice(index, 1);
      this.guardarEstudiantes();
      this.cargarEstudiantes(); // Recargar la lista de estudiantes
      this.realizarConsultas(); // Actualizar consultas después de eliminar un estudiante
    }
  }

  actualizarNotaRecuperacion(codigo: string, examenRecuperacion: number | undefined) {
    if (examenRecuperacion === undefined) return;
    const estudiante = this.estudiantes.find(e => e.codigo === codigo);
    if (estudiante) {
      estudiante.examenRecuperacion = examenRecuperacion;
      estudiante.calcularNotaDefinitiva(examenRecuperacion);
      this.guardarEstudiantes();
      this.realizarConsultas(); // Actualizar consultas después de actualizar la nota de recuperación
    }
  }

  realizarConsultas() {
    const totalEstudiantes = this.estudiantes.length;
    const totalMasculino = this.estudiantes.filter(e => e.sexo === 'M').length;
    const totalFemenino = this.estudiantes.filter(e => e.sexo === 'F').length;

    const aprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Aprobado').length;
    const reprobados = this.estudiantes.filter(e => e.estadoAprobatorio === 'Reprobado').length;

    const aprobadosMasculino = this.estudiantes.filter(e => e.sexo === 'M' && e.estadoAprobatorio === 'Aprobado').length;
    const aprobadosFemenino = this.estudiantes.filter(e => e.sexo === 'F' && e.estadoAprobatorio === 'Aprobado').length;

    this.porcentajeAprobados = (aprobados / totalEstudiantes) * 100;
    this.porcentajeReprobados = (reprobados / totalEstudiantes) * 100;

    this.porcentajeAprobadosMasculino = totalMasculino > 0 ? (aprobadosMasculino / totalMasculino) * 100 : 0;
    this.porcentajeAprobadosFemenino = totalFemenino > 0 ? (aprobadosFemenino / totalFemenino) * 100 : 0;

    this.promedioGeneral = this.estudiantes.reduce((sum, e) => sum + (e.notaDefinitiva ?? 0), 0) / totalEstudiantes;

    this.estudianteMayorNota = this.estudiantes
      .filter(e => (e.notaDefinitiva ?? 0) > this.promedioGeneral)
      .reduce((prev, current) => (prev.notaDefinitiva ?? 0) > (current.notaDefinitiva ?? 0) ? prev : current, this.estudiantes[0] || null);
  }
}