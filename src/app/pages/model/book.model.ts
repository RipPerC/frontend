import { Sage } from './sage.model';

export class Book {
  constructor(
    public title: string,
    public year: number,
    public author?: string,
    public sage?: Sage,
    public orderSage?: number,
    public fileYear?: number,
    public digital?: boolean,
    public notes?: string,
    public creationDate?: Date,
    public id?: number
  ) {}
}
