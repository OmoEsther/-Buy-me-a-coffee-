import { v4 as uuid4 } from "uuid";
const GAS = 100000000000000;


export function buyCoffee(coffee, coffeePrice) {
  coffee.id = uuid4();
  return window.contract.buyCoffee({ coffee }, GAS, coffeePrice);
}

export function getCoffees( coffee_number ) {
  //get most recent coffees
  if(coffee_number === 1){
   return window.contract.get_coffee_by_number({coffee_number});
  }else{
    return window.contract.get_coffee_by_range({ from: 1, until: coffee_number });
  }
}

export function getTotalCoffee() {
  return window.contract.get_total_number_of_coffee();
}

export function getBeneficiary() {
  return window.contract.beneficiary();
}

export function getCoffeePrice() {
  return window.contract.coffee_price();
}
