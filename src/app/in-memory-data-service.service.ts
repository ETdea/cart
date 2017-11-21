import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const productCategories = require('./mock/product-category.json');
    const suggestions = require('./mock/suggestion.json');
    const products = require('./mock/product.json');

    return { productCategories, suggestions, products };
  }
}