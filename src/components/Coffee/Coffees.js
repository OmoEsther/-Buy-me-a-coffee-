import React, { useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify"
import CoffeeForm from "./CoffeeForm"
import Loader from "../utils/Loader"
import { CoffeeCard } from "./CoffeeCard"
import {
  buyCoffee,
  getCoffeePrice,
  getCoffees as getCoffeeList,
  getTotalCoffee,
} from "../../utils/coffee"

import { NotificationSuccess, NotificationError } from "../utils/Notifications"
const Coffees = () => {
  const [coffees, setCoffees] = useState([])
  const [coffeePrice, setCoffeePrice] = useState("")
  const [loading, setLoading] = useState(false)

  // function to get the list of products
  const getCoffees = useCallback(async () => {
    try {
      setLoading(true)
      let arr = []
      const noOfCoffees = await getTotalCoffee()
      const coffees = await getCoffeeList(noOfCoffees)
      if (noOfCoffees === 1) {
        arr.push(coffees)
        setCoffees(arr)
      } else {
        setCoffees(coffees)
      }
      setCoffeePrice(await getCoffeePrice())
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }, [])

  const sendCoffee = async (coffee) => {
    try {
      setLoading(true)
      buyCoffee(coffee, coffeePrice).then((resp) => {
        toast(<NotificationSuccess text="Coffee purchased." />)
        getCoffees()
      })
    } catch (error) {
      console.log({ error })
      toast(<NotificationError text="Failed to create a coffee." />)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCoffees()
  }, [getCoffees])

  return (
    <>
      {!loading ? (
        <>
          <h1 className="text-6xl font-bold text-blue-600 mb-6 buy-me">
            Buy Me A Coffee
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CoffeeForm buyCoffee={sendCoffee} coffeePrice={coffeePrice} />
            {/* Coffee Cards */}
            <div>
              {coffees.map((_coffee) => (
                <CoffeeCard
                  key={_coffee.id}
                  coffee={{
                    ..._coffee,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Coffees
