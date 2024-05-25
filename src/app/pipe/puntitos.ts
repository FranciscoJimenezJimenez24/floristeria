import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'puntitos'
})
export class PuntitosPipe implements PipeTransform {
    transform(value: string, limit: number): string {
        if (value.length <= limit) {
          return value;
        }
        return value.substr(0, limit) + '...';
      }
}
