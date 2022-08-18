import {
    add_coffee,
    Coffee,
    get_beneficiary,
    get_coffee,
    get_coffee_price,
    set_beneficiary,
    set_coffee_price,
    STORAGE_COST,
    total_coffees,
    AllCoffees
} from "./model"
import {context, ContractPromiseBatch, logging, u128} from 'near-sdk-as';

export function init(beneficiary: string, coffee_price: u128): void {
    assert(context.predecessor == context.contractName, "Method is private");
    set_beneficiary(beneficiary);
    set_coffee_price(coffee_price);
}

/**
 * @dev allows users to buy a coffee
 * @notice an instance of Coffee is created and pushed onto the array AllCoffees
 * @param coffee Coffee object containing the necessary arguments to create an instance of Coffee
 */
export function buyCoffee(coffee: Coffee): void {
    // check if amount attached is equal to the set fee
    const price = coffee_price();
    if (price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should be equal to the coffee price")
    }

    // Send the money to the beneficiary
    const beneficiary: string = get_beneficiary();
    ContractPromiseBatch.create(beneficiary).transfer(u128.sub(price,STORAGE_COST));
    //Add coffee
    const coffee_number: i32 = add_coffee(Coffee.fromPayload(coffee));

    logging.log(`Thank you ${context.predecessor}! Coffee number: ${coffee_number}`)
}

/**
 * 
 * @returns the current price of a coffee
 */
export function coffee_price(): u128 {
    return get_coffee_price();
}

/**
 * 
 * @param from the starting index to look for coffees in AllCoffees array
 * @param until the ending index to for coffees in AllCoffees array
 * @returns an array of Coffee
 */
export function get_coffee_by_range(from: i32, until: i32): Array<Coffee> {
    let output: Array<Coffee> = new Array<Coffee>();
    assert(until > from, "Error: from index has to be lower than the until index");
    assert(AllCoffees.containsIndex(until), "Error: Out of bounds");
    for (let i: i32 = from; i <= until; i++) {
        output.push(get_coffee(i));
    }
    
    return output;
}


/**
 * 
 * @param coffee_number index of coffee
 * @returns get coffee by index
 */
export function get_coffee_by_number(coffee_number: i32): Coffee {
    assert(AllCoffees.containsIndex(coffee_number), "Error: Out of bounds");
    return get_coffee(coffee_number);
}

/**
 * 
 * @returns length of coffees
 */
export function get_total_number_of_coffee(): i32 {
    return total_coffees();
}

/**
 * @dev allows the beneficiary to update the new price of coffee
 * @notice new_price is checked to be a valid new_price first
 * @param new_price new price of coffee
 */
export function update_coffee_price(new_price: u128): void {
    const owner = beneficiary();
    assert(owner == context.predecessor, "Only Beneficiary can call this function");
    assert(new_price >= u128.Min, "Invalid new price");
    set_coffee_price(new_price);
}

// Public - beneficiary getter
export function beneficiary(): string {
    return get_beneficiary();
}
