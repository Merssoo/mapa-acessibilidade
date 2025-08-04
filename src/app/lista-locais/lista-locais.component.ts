import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocalService } from 'src/app/services/local-service/local.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ListaLocaisComponent implements OnInit, OnChanges {
  @Input() limit = 5;                    
  @Input() offset = 0;                  
  @Input() showPaginator = true;       
  @Input() pageSizeOptions = [5, 10, 20];

  locaisCadastrados: Local[] = [];
  totalItens = 0;
  pageIndex = 0;
  isLoading = false;

  constructor(private localService: LocalService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadLocais();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['limit'] || changes['offset']) {
      this.loadLocais();
    }
  }

  loadLocais(): void {
    this.isLoading = true;
    const atualOffset = this.offset ?? this.pageIndex * this.limit;

    this.localService.getLocais(this.limit, atualOffset)
      .subscribe({
        next: (data) => {
          this.locaisCadastrados = data.content;
          this.totalItens = data.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Erro ao carregar locais. Tente novamente.', 'Fechar', {
            duration: 4000,
            verticalPosition: 'top'
          });
          this.isLoading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.limit = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex * this.limit;
    this.loadLocais();
  }
}