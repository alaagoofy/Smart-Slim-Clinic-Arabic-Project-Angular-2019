import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summry'
})
export class SummryPipe implements PipeTransform {

  transform(value: string,limit?:number): any {
    if(!value) return null;
    let actuallimit = (limit)? limit:5 ;
     return value.substr(0,actuallimit)+ "....";
  }
}
