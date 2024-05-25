import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'producto-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  public producto!:Producto

  ngOnInit(){
    if (!this.producto) throw new Error('Producto property is required.')
  }
}
