import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../Entidades/Estudiantes';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  @Input() mostrarModal: boolean = false; // Definir la propiedad mostrarModal
  @Output() cerrarModalEvent = new EventEmitter<void>();

  codigo: string = '';
  cedula: string = '';
  nombres: string = '';
  apellidos: string = '';
  sexo: string = 'M';
  fechaNacimiento: string = '';
  parcial1: number = 0;
  parcial2: number = 0;

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }

  onSubmit() {
    const nuevoEstudiante = new Estudiante(
      this.codigo,
      this.cedula,
      this.nombres,
      this.apellidos,
      this.sexo,
      this.fechaNacimiento,
      this.parcial1,
      this.parcial2
    );

    // Guardar el nuevo estudiante en el almacenamiento local
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    const estudiantes = estudiantesGuardados ? JSON.parse(estudiantesGuardados) : [];
    estudiantes.push(nuevoEstudiante);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

    this.cerrarModal();
  }
}