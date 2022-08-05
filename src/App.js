import React, { useEffect, useCallback, useState } from "react"
import Wallet from "./components/Wallet"
import { Container, Nav } from "react-bootstrap"
import { login, logout as destroy, accountBalance } from "./utils/near"
import { Notification } from "./components/utils/Notifications"
import Cover from "./components/utils/Cover"
import Coffees from "./components/Coffee/Coffees"
import coverImg from "./assets/img/coffee.jpg"
import coffeeBarista from "./assets/img/coffeeBarista.svg"
import "./App.css"

function App() {
  const account = window.walletConnection.account()

  const [balance, setBalance] = useState("0")

  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance())
    }
  }, [account])

  useEffect(() => {
    getBalance()
  }, [getBalance])

  return (
    <div className="App">
      <Notification />
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <Coffees />
          </main>
        </Container>
      ) : (
        // connect Wallet
        <Cover name="DApp" login={login} coverImg={coverImg} />
      )}

      <div className="side-coffee">
        <img src={coffeeBarista} alt="coffee-guys" />
      </div>
    </div>
  )
}

export default App
