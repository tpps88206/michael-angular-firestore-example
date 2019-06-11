export class DecorateModel {
  id: string;
  title: string;
  description: string;
  expectant: number;
  practical: number;

  constructor(decorate: any = {}) {
    this.id = decorate.id;
    this.title = decorate.title;
    this.description = decorate.description;
    this.expectant = decorate.expectant || 0;
    this.practical = decorate.practical || 0;
  }
}
