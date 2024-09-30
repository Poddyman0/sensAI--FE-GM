import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

export function Filter() {
  const [sort, setSort] = useState("");
  const [order_by, setOrder_by] = useState("");

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeOrderBY = (event) => {
    setOrder_by(event.target.value);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="sort"
          onChange={handleChangeSort}
        >
          <MenuItem value="option-1">option 1</MenuItem>
          <MenuItem value="option-2">option 2</MenuItem>
          <MenuItem value="option-3">option 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order_by}
          label="Order by"
          onChange={handleChangeOrderBY}
        >
          <MenuItem value="desc">Descending</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
