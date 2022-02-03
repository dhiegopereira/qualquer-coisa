import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FilterList } from '@material-ui/icons/';
import React, { useState } from 'react';
import { ContentTypes, LeftBar, StyledButton, StyledHr } from './styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function LeftBarWorkers({
  all,
  frontend,
  backend,
  fullstack,
  applyFilters,
}) {
  const [value, setValue] = React.useState('Todos perfis');

  const handleChange = (event) => {
    if (event.target.value == 'Frontend Developer') {
      frontend();
    } else if (event.target.value == 'Backend Developer') {
      backend();
    } else if (event.target.value == 'Fullstack Developer') {
      fullstack();
    } else {
      all();
    }
    setValue(event.target.value);
  };

  return (
    <LeftBar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <FilterList />
        <h4>Filtrar</h4>
      </div>
      <StyledHr />
      <span>Perfil</span>
      <ContentTypes>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Todos perfis"
              control={<Radio />}
              label="Todos perfis"
            />
            <FormControlLabel
              value="Backend Developer"
              control={<Radio />}
              label="Backend Developer"
            />
            <FormControlLabel
              value="Frontend Developer"
              control={<Radio />}
              label="Frontend Developer"
            />
            <FormControlLabel
              value="Fullstack Developer"
              control={<Radio />}
              label="Fullstack Developer"
            />
          </RadioGroup>
        </FormControl>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={stateBackend}
              onChange={handleChangeBackend}
              name="checkedB"
              color="primary"
            />
          }
          label="Backend"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stateFrontend}
              onChange={handleChangeFrontend}
              name="checkedB"
              color="primary"
            />
          }
          label="Frontend"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stateFullStack}
              onChange={handleChangeFullStack}
              name="checkedB"
              color="primary"
            />
          }
          label="FullStack"
        /> */}
      </ContentTypes>
      {/* <StyledHr /> */}
      {/* <span>Skills</span>
      <ContentTypes>
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="HTML"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="CSS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="Javascript"
        />
      </ContentTypes> */}
      {/* <ContentTypes>
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="Android"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="PHP"
        />
      </ContentTypes> */}
      {/* <StyledHr />
      <span>Frameworks</span>
      <ContentTypes>
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="Wordpress"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="Firebase"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="React"
        />
      </ContentTypes>
      <ContentTypes>
        <FormControlLabel
          control={
            <Checkbox
              checked={recruiterCheck}
              onChange={handleChangeCheckBox}
              name="checkedB"
              color="primary"
            />
          }
          label="Node"
        />
      </ContentTypes> */}

      <StyledHr />

      <StyledButton fullWidth variant="contained" onClick={applyFilters}>
        Aplicar filtros
      </StyledButton>
    </LeftBar>
  );
}
