import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  imports: [CurrencyPipe],
  templateUrl: './produto-list.html',
  styleUrls: ['./produto-list.css'],
})
export class ProdutoList {
  private readonly produtosService = inject(ProdutoService);

  produtos: Produto[] = [];
  carregando: boolean = false;

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;

    this.produtosService.listar().subscribe({
      next: (dados: Produto[]) => {
        this.produtos = dados;
        this.carregando = false;
      },

      error: (erro: any) => {
        console.error('Erro ao carregar produtos:', erro);
        this.carregando = false;
      }
    });
  }
}