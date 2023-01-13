import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolEurExchanger'
})
export class DolEurExchangerPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string {

    if (value == null) return "";
    const clearValue = value.replace( /^\D+/g, '');
    const numValue = Number.parseFloat(clearValue);

    if (value.includes("$")) {
      const eur = numValue * 0.94;
      return eur.toFixed(2).toString() + "€";
    }

    //prices in dishes interface are given in dolars
    else if (value.includes("€")) {
      const dol = numValue;
      return dol.toFixed(2).toString() + "$";
    }
    return value;
  }

}
