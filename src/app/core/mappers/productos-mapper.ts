import { ProductosInterface } from '../interface/productos-interface';
import { ProductosResponse } from '../modelos/productos-response';

export class ProductosMapper {
  static map(data: ProductosResponse): ProductosInterface {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      date_release: data.date_release,
      date_revision: data.date_revision,
    };
  }
}
