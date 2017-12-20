export class Goods{
    id: string;
    title: string;
    desciption: string;
    startDate: string;
    endDate: string;
    products: Product[];
    units: Unit[];
}

export class Product{
    name: string;
    chineseName: string;
    producer: string;
    dosage: string;
    nhiDrugCode: string;
    nhiPrice: string;
    package: string;
}

export class Unit{
    title: string;
    subtractStockQty: number;
    price: number;
}