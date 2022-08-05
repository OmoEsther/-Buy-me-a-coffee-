import { Coffee, set_beneficiary, get_beneficiary, set_coffee_price, get_coffee_price, add_coffee, get_coffee, total_coffees, STORAGE_COST } from "./model"
import { ContractPromiseBatch, logging, context, u128 } from 'near-sdk-as';

export function init(beneficiary: string, coffee_price: u128): void {
    assert(context.predecessor == context.contractName, "Method new is private");
    set_beneficiary(beneficiary);
    set_coffee_price(coffee_price);
}

export function buyCoffee(coffee: Coffee): void {
    // check if amount attached is equal to the set fee
    const price = coffee_price();
    if (price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should be equal to the pet's addoption fee")
    }

    //Add coffee
    const coffee_number: i32 = add_coffee(Coffee.fromPayload(coffee));

    logging.log(`Thank you ${context.predecessor}! Coffee number: ${coffee_number}`)
    // Send the money to the beneficiary
    const beneficiary: string = get_beneficiary();
    //@ts-ignore
    ContractPromiseBatch.create(beneficiary).transfer(price - STORAGE_COST);
}

//Get adoption fee
export function coffee_price(): u128 {
    const price: u128 = get_coffee_price();
    return price;
}

// get a range of coffees
export function get_coffee_by_range(from: i32, until: i32): Array<Coffee> {
    let output: Array<Coffee> = new Array<Coffee>();
    for (let i: i32 = from; i <= until; i++) {
        output.push(get_coffee(i));
    }
    return output;
}


// Public - get coffee by number
export function get_coffee_by_number(coffee_number: i32): Coffee {
    return get_coffee(coffee_number);
}

// return length of coffees
export function get_total_number_of_coffee(): i32 {
    return total_coffees();
}

// update coffee fee
export function update_coffee_price(new_price: u128): void {
    const owner = beneficiary();
    assert(owner == context.predecessor, "Only Beneficiary can call this function");
    set_coffee_price(new_price);
}

// Public - beneficiary getter
export function beneficiary(): string {
    return get_beneficiary();
}
