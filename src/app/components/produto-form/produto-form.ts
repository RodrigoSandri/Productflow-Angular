import { Component, EventEmitter, inject, Output, ChangeDetectorRef } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  imports: [FormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoForm {
  title = "Novo Produto";

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0
  };

  @Output() salvo = new EventEmitter<void>();

  private readonly produtoService = inject(ProdutoService);

  constructor(private cdr: ChangeDetectorRef) {}

  salvar(): void {
    this.produtoService.criar(this.produto).subscribe({
      next: () => {
        this.produto = {
          nome: '',
          descricao: '',
          preco: 0
        };

        this.salvo.emit();
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao salvar', erro),
    });
  }
}