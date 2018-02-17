export class Order {
  id: string;
  customer: string;
  total: number;
  date: Date;
  details = [new Detail()];
}

export class Detail{
  id: string;
  title: string;
  units = [new Unit()]
}

export class Unit{
  title: string;
  quantity: number ;
  price: number;
}

