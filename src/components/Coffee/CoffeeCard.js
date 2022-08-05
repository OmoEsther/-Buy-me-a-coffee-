import React from "react"
import { Box, Typography } from "@mui/material"
import { convertTime } from "../../utils/time"

export const CoffeeCard = ({ coffee }) => {
  const { id, giver, name, message, timestamp } = coffee
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
          <Typography variant="string">
            Date: {convertTime(timestamp)}
          </Typography>
        </div>
      </Box>
    </>
  )
}
