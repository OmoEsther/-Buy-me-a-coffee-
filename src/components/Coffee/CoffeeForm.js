import React, { useState } from "react"
import PropTypes from "prop-types"
import { utils } from "near-api-js"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage"

const CoffeeForm = ({ buyCoffee, coffeePrice }) => {
  const [_name, setName] = useState("")
  const [_message, setMessage] = useState("")

  const handleOnMessageChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const handleOnNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  function onSubmit(e) {
    e.preventDefault()

    const name = _name ? _name : "Anonymous"
    const message = _message ? _message : "Enjoy Your Coffee"

    console.log(name, message)

    buyCoffee({
      name,
      message,
    })
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ margin: "2rem 0 1rem 0", width: "20rem" }}
      >
        <div>
          <TextField
            label="Name"
            htmlfor="name"
            color="primary"
            onChange={handleOnNameChange}
            placeholder="Enter Name"
            focused
            fullWidth
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <TextField
            label="Message"
            htmlfor="message"
            color="primary"
            onChange={handleOnMessageChange}
            placeholder="Send the Creator a Message"
            focused
            multiline
            fullWidth
          />
        </div>
        <Button
          startIcon={<EmojiFoodBeverageIcon />}
          variant="contained"
          type="submit"
        >
          Support {utils.format.formatNearAmount(coffeePrice)} NEAR
        </Button>
      </form>
    </>
  )
}

CoffeeForm.propTypes = {
  buyCoffee: PropTypes.func.isRequired,
  coffeePrice: PropTypes.string.isRequired,
}

export default CoffeeForm
