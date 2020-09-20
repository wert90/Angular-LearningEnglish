import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public Instrucao: string = 'Traduza a frase'
  public frases: Frase[] = FRASES
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
   }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  verificarResposta(): void {
    
    if (this.rodadaFrase.frasePtBr.toUpperCase() == this.resposta.toUpperCase()){
      alert('A tradução está correta')

      this.rodada++
      this.progresso = this.progresso + (100 / this.frases.length)

      if (this.rodada === 4){
        this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada()
    }
    else {
      alert('A tradução está errada')

      this.tentativas--

      if (this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
    }

  }

  public atualizaRodada(): void{
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}
