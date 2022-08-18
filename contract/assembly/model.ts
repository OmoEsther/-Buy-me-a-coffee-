import { PersistentVector, u128, context, storage } from "near-sdk-as";

@nearBindgen //serializes custom class before storing it on the blockchain
export class Coffee {
    id: string;
    giver: string;
    name: string;
    message: string;
    amount: u128;
    timestamp: u64;
    public static fromPayload(payload: Coffee): Coffee { //static method that takes a payload and returns a new Coffee object
        const coffee = new Coffee();
        coffee.id = payload.id;
        coffee.giver = context.predecessor;
        coffee.name = payload.name;
        coffee.message = payload.message;
        coffee.timestamp = context.blockTimestamp;
        coffee.amount = get_coffee_price();
        return coffee;
    }
}
// Default = 0.001 NEAR
export const STORAGE_COST: u128 = u128.from("1000000000000000000000")


export const AllCoffees = new PersistentVector<Coffee>("allCoffees")

/**
 * @dev sets beneficiary
 * @param beneficiary wallet id of beneficiary
 */
export function set_beneficiary(beneficiary: string): void {
    storage.set<string>("beneficiary", beneficiary)
}

export function get_beneficiary(): string {
    return storage.getPrimitive<string>("beneficiary", "coffeedapp.omoesther.testnet")
}

// Coffee Price
// Default = 1 NEAR
const coffee_price: u128 = u128.from("1000000000000000000000000");

export function set_coffee_price(price: u128): void {
    storage.set<u128>("price", price)
}


/**
 * @notice if price hasn't been set in storage, the default coffee_price is returned
 * @returns price of a coffee
 */
export function get_coffee_price(): u128 {
    if (!storage.contains("price")) { return coffee_price }
    return storage.getSome<u128>("price")
}

// Coffees
export function add_coffee(coffee: Coffee): i32 {
    AllCoffees.push(coffee);
    return AllCoffees.length
}

export function get_coffee(coffee_number: i32): Coffee {
    return AllCoffees[coffee_number];
}

export function total_coffees(): i32 {
    return AllCoffees.length
}
