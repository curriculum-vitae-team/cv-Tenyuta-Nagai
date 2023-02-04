import { useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { ModalWindow } from '../../../UI/ModalWindow';
import { GET_ALL_PROJECTS } from '../../../../graphql/queries/projects';
import { Spinner } from '../../../Spinner';
import { ICvQueryResult } from '../../../../graphql/types/results/cv';
import { CV } from '../../../../graphql/queries/cv';
import { IProjectsResult } from '../../../../graphql/types/results/projects';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

type TSelectData = string[];

export const UpdateModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<IProjectsResult>(GET_ALL_PROJECTS, {
    variables: { id },
  });
  const { loading: cvLoading, error: cvError, data: cvData } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
  });

  if (error || cvError) {
    onClose();
  }
  console.log('projects', data);

  const [personName, setPersonName] = useState<TSelectData[]>(
    cvData?.cv?.projects?.length
      ? cvData?.cv.projects?.map(({ name, id }) => {
          return [name, id];
        })
      : []
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    console.log('value', value);
    // setPersonName((prev)value as TSelectData[]);
    console.log(5555, personName);
    // On autofill we get a stringified value.
    typeof value === 'string' ? console.log(true) : console.log(false);
  };

  console.log(
    111,
    personName.map((el) => el[1])
  );

  return (
    <ModalWindow title={'Update Cv Projects'} onClose={onClose} open={open}>
      {loading || cvLoading ? (
        <Spinner />
      ) : (
        <form>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-checkbox-label">Projects</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={
                (personName.map((el) => {
                  return el;
                }) as unknown) as TSelectData[]
              }
              onChange={handleChange}
              input={<OutlinedInput label="Projects" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {data?.projects.map(({ name, id }) => (
                <MenuItem key={id} value={[name, id]}>
                  <Checkbox checked={personName.map((el) => el[1]).includes(id)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </form>
      )}
    </ModalWindow>
  );
};
