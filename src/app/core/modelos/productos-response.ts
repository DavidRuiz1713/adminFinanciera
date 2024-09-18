export class ProductosResponse {
  id: String;
  name: String;
  description: String;
  logo: String;
  date_release: Date;
  date_revision: Date;

  constructor(data: { [key: string]: unknown }) {
    this.id = data['id'] as string;
    this.name = data['name'] as string;
    this.description = data['description'] as string;
    this.logo = data['logo'] as string;
    this.date_release = data['date_release'] as Date;
    this.date_revision = data['date_revision'] as Date;
  }
}
