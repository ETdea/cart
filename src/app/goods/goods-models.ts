export class Goods {
  id = "";
  title = "";
  desciption = "";
  startDate = "";
  endDate = "";
  products = new Product();
  units = [new Unit()];

  create(data): Goods{
    data.units = JSON.parse(data.product.units);
    return data as Goods;
  }
}

export class Product {
  name = "";
  chineseName = "";
  producer = "";
  dosage = "";
  nhiDrugCode = "";
  nhiPrice: number;
  package = "";
}

export class Unit {
  title= "";
  subtractStockQty: number;
  price: number;
}

