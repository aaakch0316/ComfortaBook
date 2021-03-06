import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import * as Hangul from "hangul-js";

import "./SearchBar.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      "& > *": {
        margin: theme.spacing(1),
      },
      display: "flex",
      marginBottom: "20px",
      marginLeft: "30px",
      width: "650px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      width: "65%",
    },
    button: {
      "& > *": {
        margin: theme.spacing(1),
      },
      width: 20,
      margin: 0,
      padding: 0,
    },
  })
);

function SearchBar(props: any) {
  // select
  const [selector, setSelector] = useState("title");
  const [searchSelector, setSearchSelector] = useState("title");
  const keyboard: any = useRef(null);

  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelector(event.target.value as string);
  };

  const updateSelector = () => {
    setSearchSelector(selector);
  };

  useEffect(updateSelector, [selector]);

  // input
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // const inputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setInput(event.target.value as string);
  // };

  const [layoutName, setLayoutName] = useState("default");

  const onChangeAll = (inputs: any) => {
    if (!!inputs.default === false) {
      inputs.default = "";
    } else {
      inputs.default = Hangul.assemble(inputs.default);
    }
    setInput(inputs.default);
  };

  const handleShift = () => {
    if (layoutName === "default" || layoutName === "shift") {
      let newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    } else {
      let newLayoutName = layoutName === "kdefault" ? "kshift" : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  const onKeyPress = (button: any) => {
    if (button === "{shift}") handleShift();
    if (button === "{close}") {
      setKeyboardOpen(false);
    }
    if (button === "{language}") {
      const newLayoutName =
        layoutName === "kdefault" || layoutName === "kshift"
          ? "default"
          : "kdefault";
      setLayoutName(newLayoutName);
    }
  };

  const onChangeInput = (event: any) => {
    const inputVal = event.target.value;
    setInput(inputVal);

    keyboard.current.setInput(inputVal);
  };

  const updateInput = () => {
    setSearchText(input);
  };

  useEffect(updateInput, [input]);

  const classes = useStyles();

  const sendData = () => {
    props.setSelectData(searchSelector);
    props.setValueData(searchText);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  return (
    <div className="searchBar">
      <form className={classes.searchBar} noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={selector}
            onChange={selectChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"author"}>저자</MenuItem>
          </Select>
        </FormControl>
        <TextField
          onFocus={() => {
            setKeyboardOpen(true);
          }}
          value={input}
          className={classes.textField}
          placeholder="검색어를 입력하세요."
          onChange={(e: any) => onChangeInput(e)}
          onKeyPress={handleKeyPress}
        />
        <Button className={classes.button} onClick={sendData}>
          <SearchIcon style={{ color: pink[300] }} />
        </Button>
      </form>
      <div className={`${!keyboardOpen ? "hidden" : ""}`}>
        <Keyboard
          keyboardRef={(r: any) => (keyboard.current = r)}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{language} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space} {close}",
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{language} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space} {close}",
            ],
            kdefault: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕㅑㅑ ㅐ ㅔ [ ] \\",
              '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
              ".com @ {space} {close}",
            ],
            kshift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕㅑㅑ ㅒ ㅖ { } |",
              '{language} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : " {enter}',
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {shift}",
              ".com @ {space} {close}",
            ],
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
