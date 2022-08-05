import React from "react"
import { Box, Typography } from "@mui/material"

export const CoffeeCard = ({ coffee }) => {
  const { id, giver, name, message, timestamp } = coffee
  console.log(id, giver, name, message, timestamp)
  return (
    <>
      <Box
        sx={{
          textAlign: "left",
          marginY: "0.7rem",
        }}
        className="coffee-card"
      >
        <div className="fancy-line"></div>
        <div>
          <Typography variant="string" sx={{ textTransform: "capitalize" }}>
            Supporter: {name}
          </Typography>
        </div>
        <div>
          <Typography variant="string">Message: {message}</Typography>
        </div>
        <div>
          <Typography variant="string">Giver: {giver}</Typography>
        </div>
        <div>
          <Typography variant="string">
            TimeStamp: {timestamp?.toString()}
          </Typography>
        </div>
      </Box>
    </>
  )
}
