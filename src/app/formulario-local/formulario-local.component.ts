import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../services/local-service/local.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-formulario-local',
  templateUrl: './formulario-local.component.html',
  styleUrls: ['./formulario-local.component.scss']
})
export class FormularioLocalComponent implements OnInit {
  formularioLocal: FormGroup;
    tiposLocal: string[] = [ 'Banco', 'Bar', 'Clínica', 'Colégio', 'Comércio', 'Condomínio', 
    'Escola', 'Estádio', 'Faculdade', 'Farmácia', 'Feira', 'Hospital', 'Igreja', 'Loja', 
    'Mercado', 'Padaria', 'Parque', 'Ponto de ônibus', 'Posto de combustível', 
    'Posto de saúde', 'Praça', 'Prefeitura', 'Restaurante', 'Rodoviária', 'Salão de beleza', 
    'Shopping', 'Supermercado', 'Terminal', 'Universidade'];

  bairros: string[] = [
   'Ana Maria', 'Archimedes Naspolini', 'Área Rural de Criciúma', 
   'Argentina', 'Boa Vista', 'Bosque do Repouso', 'Brasília', 
   'Buenos Aires', 'Capão Bonito', 'Catarinense', 'Ceará', 'Centro', 
   'Cidade Mineira Nova', 'Cidade Mineira Velha', 'Colonial', 
   'Coloninha Zilli', 'Comerciário', 'Cristo Redentor', 'Cruzeiro do Sul', 
   'Dagostin', 'Demboski', 'Distrito Industrial', 'Estaçãozinha', 
   'Fábio Silva', 'Imigrantes', 'Imperatriz', 'Jardim Angélica', 
   'Jardim das Paineiras', 'Jardim Maristela', 'Jardim Montevidéu', 
   'Jardim União', 'Laranjinha', 'Liberdade', 'Linha Anta', 
   'Linha Batista', 'Linha Cabral', 'Lote Seis', 'Mãe Luzia', 
   'Maria Céu', 'Metropol', 'Michel', 'Milanese', 'Mina Brasil',
    'Mina do Mato', 'Mina do Toco', 'Mina União', 'Mineira Nova', 
    'Mineira Velha', 'Monte Castelo', 'Morro Estevão', 'Nossa Senhora da Salete', 
    'Nossa Senhora do Carmo', 'Operária Nova', 'Paraíso', 'Pedro Zanivan', 'Pinheirinho', 
    'Pio Corrêa', 'Poço Um', 'Primeira Linha', 'Primeira Linha Pontilhão', 'Progresso', 
    'Promorar Vila Vitória', 'Próspera', 'Quarta Linha', 'Recanto Verde', 'Renascer', 'Rio Maina', 
    'Sangão', 'Santa Augusta', 'Santa Bárbara', 'Santa Catarina', 'Santa Luzia', 'Santo Antônio', 
    'São Cristóvão', 'São Defende', 'São Domingos', 'São Francisco', 'São João', 'São Luiz', 
    'São Marcos', 'São Roque', 'São Sebastião', 'São Simão', 'Tereza Cristina', 'Universitário', 
    'Vera Cruz', 'Verdinho', 'Vila Floresta', 'Vila Floresta II', 'Vila Francesa', 'Vila Isabel', 
    'Vila Macarini', 'Vila Manaus', 'Vila Maria', 'Vila Miguel', 'Vila Nova Esperança', 'Vila Rica', 
    'Vila São José', 'Vila Visconde', 'Vila Zuleima', 'Wosocris'
  ];
  isLoading = false;
  bairrosFiltrados: string[] = [];
  tiposLocalFiltrados: String[] = [];

  constructor(private fb: FormBuilder, private localService: LocalService, private snackBar: MatSnackBar) {
    this.formularioLocal = this.fb.group({
      cidade: [{ value: 'Criciúma - SC', disabled: true }],
      bairro: ['', [Validators.required, bairroValidoValidator(this.bairros)]],
      rua: ['', Validators.required],
      tipoLocal: ['', [Validators.required, tipoLocaisValidoValidator(this.tiposLocal)]],
      acessivel: [null, Validators.required],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    this.bairrosFiltrados = this.bairros;
    this.tiposLocalFiltrados = this.tiposLocal;

    this.formularioLocal.get('bairro')?.valueChanges
      .pipe(
        startWith(''),
        map(valor => this._filtrarBairros(valor || ''))
      )
      .subscribe(filtrados => this.bairrosFiltrados = filtrados);

    this.formularioLocal.get('tipoLocal')?.valueChanges
      .pipe(
        startWith(''),
        map(valor => this.filtrarTiposLocais(valor || ''))
      )
      .subscribe(filtrados => this.tiposLocalFiltrados = filtrados);
  }

  private _filtrarBairros(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.bairros.filter(bairro =>
      bairro.toLowerCase().includes(filtro)
    );
  }

  private filtrarTiposLocais(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.tiposLocal.filter(tipoLocais =>
      tipoLocais.toLowerCase().includes(filtro)
    );
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

function bairroValidoValidator(bairrosValidos: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;
    if (valor && !bairrosValidos.includes(valor)) {
      return { bairroInvalido: true };
    }
    return null;
  };
}

function tipoLocaisValidoValidator(tipoLocais: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valor = control.value;
    if (valor && !tipoLocais.includes(valor)) {
      return { tipoLocaisInvalido: true };
    }
    return null;
  };
}