export interface ProductosInterface {
  id: String;
  name: String;
  description: String;
  logo: String;
  date_release: Date;
  date_revision: Date;
}

export interface RespuestaAPI {
  data: ProductosInterface[];
}
