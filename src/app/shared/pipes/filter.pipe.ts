import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform<T, K extends keyof T>(data: T[], key: K, search: string = ''): T[] {
    if (!search.trim()) {
      return data
    }

    return data.filter(data => {
      // @ts-ignore
      return data[key].toLowerCase().includes(search.toLowerCase())
    })
  }
}
