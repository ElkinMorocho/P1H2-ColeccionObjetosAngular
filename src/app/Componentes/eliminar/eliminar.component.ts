import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../Entidades/Estudiantes';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  estudiante: Estudiante | undefined;
  codigo: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get('codigo') || '';
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      const estudiantes = JSON.parse(estudiantesGuardados);
      this.estudiante = estudiantes.find((e: Estudiante) => e.codigo === this.codigo);
    }
  }

  eliminarEstudiante() {
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      let estudiantes = JSON.parse(estudiantesGuardados);
      estudiantes = estudiantes.filter((e: Estudiante) => e.codigo !== this.codigo);
      localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    }
    this.router.navigate(['/']);
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}