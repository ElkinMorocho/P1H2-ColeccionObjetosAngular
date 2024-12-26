import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../Entidades/Estudiantes';

@Component({
  selector: 'app-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent {
  @Input() mostrarModal: boolean = false;
  @Input() estudiante: Estudiante | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }

  guardarCambios() {
    if (this.estudiante) {
      // Guardar los cambios en el almacenamiento local
      const estudiantesGuardados = localStorage.getItem('estudiantes');
      const estudiantes = estudiantesGuardados ? JSON.parse(estudiantesGuardados) : [];
      const index = estudiantes.findIndex((e: Estudiante) => e.codigo === this.estudiante!.codigo);
      if (index !== -1) {
        estudiantes[index] = this.estudiante;
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
      }
      this.cerrarModal();
    }
  }
}