import { Component, OnInit } from '@angular/core';

interface Local {
  bairro: string;
  rua: string;
  tipoLocal: string;
  acessivel: boolean;
  descricao: string;
}

@Component({
  selector: 'app-lista-locais',
  templateUrl: './lista-locais.component.html',
  styleUrls: ['./lista-locais.component.scss']
})
export class ListaLocaisComponent implements OnInit {
  locaisCadastrados: Local[] = [
    { bairro: 'Pio Corrêa', rua: 'Rua da Paz', tipoLocal: 'Calçada', acessivel: false, descricao: 'Não tem rampa nem piso tátil' },
    { bairro: 'Centro', rua: 'Rua João Pessoa', tipoLocal: 'Banheiro adaptado', acessivel: true, descricao: '' }
    // Mais locais serão adicionados aqui
  ];

  constructor() { }

  ngOnInit(): void {
  }
}