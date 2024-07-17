import styled from "@emotion/styled";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, InputAdornment, Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { generatePassword } from "./utils/functions";
import { ContentCopy } from "@mui/icons-material";

const min = 1;
const max = 16;

const Header = styled.h1`
  padding-inline: 32px;
  text-align: center;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const PasswordGenerator = () => {
  const [count, setCount] = useState<number | string>(1);
  const [length, setLength] = useState<number>(20);
  const [numbers, setNumbers] = useState(true);
  const [special, setSpecial] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  // console.log(
  //   generatePassword(32, {
  //     numbers: true,
  //     special: false,
  //     lowerCase: true,
  //     upperCase: true,
  //   })
  // );

  const generate = () => {
    const arr: string[] = [];

    for (let i = 0; i < +count; i++) {
      arr.push(
        generatePassword(length, {
          numbers,
          special,
          lowerCase,
          upperCase,
        })
      );
    }

    setPasswords(arr);
  };

  const copyText = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {});
  };

  return (
    <Box>
      <Header>Şifre Oluşturucu</Header>

      <FormGroup sx={{ mb: 5 }}>
        <TextField
          label="Üretilecek şifre adeti"
          type="number"
          InputProps={{
            inputProps: { min: 1, max: 16 },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={count}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value > max) {
              setCount(max);
            } else if (value < min) {
              setCount(min);
            } else {
              setCount(value || "");
            }
          }}
        />
        <Typography gutterBottom sx={{ mt: 2 }}>
          Karakter uzunluğu
        </Typography>
        <Slider
          min={1}
          max={64}
          value={length}
          onChange={(_e, newValue) => {
            setLength(newValue as number);
          }}
          // onChange={(e) => {
          //   console.log(e);
          //   return e.target.value;
          // }}
          valueLabelDisplay="auto"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={upperCase}
              onChange={(_e, checked) => {
                setUpperCase(checked);
              }}
            />
          }
          label="Büyük karakter"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={lowerCase}
              onChange={(_e, checked) => {
                setLowerCase(checked);
              }}
            />
          }
          label="Küçük karakter"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={special}
              onChange={(_e, checked) => {
                setSpecial(checked);
              }}
            />
          }
          label="Özel karakter"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={numbers}
              onChange={(_e, checked) => {
                setNumbers(checked);
              }}
            />
          }
          label="Sayı"
        />
        <Button size="large" variant="contained" onClick={generate}>
          Şifre Üret
        </Button>
      </FormGroup>

      {passwords?.map((value, index) => (
        <TextField
          key={value}
          fullWidth
          label={`Şifre ${index + 1}`}
          id={`password-${index + 1}`}
          inputProps={{ readOnly: true }}
          value={value}
          sx={{ my: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => copyText(value)} edge="start">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ))}
    </Box>
  );
};
export default PasswordGenerator;
