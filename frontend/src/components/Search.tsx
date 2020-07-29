import React from "react";
import axios from "axios";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { pink } from "@material-ui/core/colors";

import "./Search.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          <MenuItem value={10}>제목</MenuItem>
          <MenuItem value={20}>저자</MenuItem>
          <MenuItem value={30}>출판사</MenuItem>
        </Select>
        <FormHelperText>검색 조건</FormHelperText>
      </FormControl>
    </div>
  );
}

function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="검색어를 입력하세요." />
      <SearchIcon style={{ color: pink[300] }} />
    </form>
  );
}

class Search extends React.Component {
  const CLIENT_ID = '9sHgbLGnxPzpdoZNrWJT'
  cosnt SECRET_KEY = 'Drxdqz8aCA'
  state = {
    books: [],
  };

  getBooks = async () => {
    const {
      data: {
        data: { books },
      },
    } = await axios.get('https://openapi.naver.com/v1/search/book.json', {
      params: {
        query:
      }
    });
  };

  render() {}
}

function Search() {
  return (
    <div className="search">
      <SimpleSelect />
      <BasicTextFields />
      <BookList />
    </div>
  );
}

export default Search;
