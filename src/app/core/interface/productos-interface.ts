export interface ProductosInterface {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface RespuestaAPI {
  data: ProductosInterface[];
}
