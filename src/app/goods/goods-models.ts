export class Goods {
  id = "";
  title = "";
  desciption = "";
  startDate = "";
  endDate = "";
  products = new Product();
  units = [new Unit()];
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

