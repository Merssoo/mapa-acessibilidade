import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
      console.log('Dados do formulário:', this.formularioLocal.value);
      // Aqui você fará a chamada para o seu backend (POST /locais)
    } else {
      this.formularioLocal.markAllAsTouched(); // Marcar para exibir erros
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}