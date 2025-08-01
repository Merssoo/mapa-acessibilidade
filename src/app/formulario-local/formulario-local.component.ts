import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../services/local-service/local.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-formulario-local',
  templateUrl: './formulario-local.component.html',
  styleUrls: ['./formulario-local.component.scss']
})
export class FormularioLocalComponent implements OnInit {
  formularioLocal: FormGroup;
  tiposLocal: string[] = ['Calçada', 'Comércio', 'Repartição Pública', 'Escola', 'Outro'];
  bairros: string[] = [
    'Centro', 'Pio Corrêa', 'Pinheirinho', 'Michel', 'Comerciário',
    // Adicione mais bairros de Criciúma aqui ou carregue do backend
  ];
  isLoading = false;

  constructor(private fb: FormBuilder, private localService: LocalService, private snackBar: MatSnackBar) {
    this.formularioLocal = this.fb.group({
      cidade: [{ value: 'Criciúma - SC', disabled: true }],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      tipoLocal: ['', Validators.required],
      acessivel: [null, Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formularioLocal.valid) {
    const dados = this.formularioLocal.getRawValue();
    this.isLoading = true;

    this.localService.registrarLocal(dados).subscribe({
      next: (resposta) => {
        this.isLoading = false;
        this.snackBar.open('Local registrado com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.formularioLocal.reset({ cidade: 'Criciúma - SC' });
      },
      error: (erro) => {
        this.isLoading = false;
        this.snackBar.open('Erro ao registrar o local. Tente novamente.', 'Fechar', {
          duration: 4000,
          verticalPosition: 'top'
        });
      }
    });

  } else {
    this.formularioLocal.markAllAsTouched();
    this.snackBar.open('Preencha todos os campos obrigatórios.', 'Fechar', {
      duration: 4000,
      verticalPosition: 'top'
    });
  }
  }
}