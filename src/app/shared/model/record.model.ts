export class RecordModel {
  id: string;
  check: boolean;
  description: string;
  user: string;
  value: number;
  createdAt: any;
  updatedAt: any;
  date: any;
  type: string;

  constructor(record: any = {}) {
    this.id = record.id;
    this.check = record.check;
    this.description = record.description || '';
    this.user = record.user;
    this.value = record.value;
    this.createdAt = record.createdAt;
    this.updatedAt = record.updatedAt;
    this.date = record.date;
    this.type = record.type;
  }
}
