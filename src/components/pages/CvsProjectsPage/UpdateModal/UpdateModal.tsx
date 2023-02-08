import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import { IModalForCreatingProps } from '../../../Table/template/templateTable.types';
import { ModalWindow } from '../../../UI/ModalWindow';
import { GET_ALL_PROJECTS } from '../../../../graphql/queries/projects';
import { Spinner } from '../../../Spinner';
import { ICvQueryResult, ICvResult } from '../../../../graphql/types/results/cv';
import { CV } from '../../../../graphql/queries/cv';
import { IProjectsResult } from '../../../../graphql/types/results/projects';
import { UPDATE_CV } from '../../../../graphql/mutations/cv';
import { TError } from '../../../../types/errorTypes';
import { createArrayForLanguages } from '../../../../utils/createArrayForLanguages';
import { createArrayForSkills } from '../../../../utils/createArrayForSkills';
import { updateCvsCacheAfterCvUpdateProjectsMutation } from '../../../../graphql/cache/cv';
import * as Styled from './UpdateModal.styles';

export const UpdateModal: FC<IModalForCreatingProps> = ({ open, onClose }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<IProjectsResult>(GET_ALL_PROJECTS, {
    variables: { id },
  });
  const { loading: cvLoading, data: cvData } = useQuery<ICvQueryResult>(CV, {
    variables: { id },
  });
  const [projects, setProjects] = useState<Record<string, string>>({});
  const [projectsIds, setProjectsIds] = useState<string[]>(
    cvData?.cv?.projects?.length ? cvData?.cv.projects?.map(({ id }) => id) : []
  );
  const [updateCv, { loading: updateCvLoading }] = useMutation<ICvResult>(UPDATE_CV, {
    update(cache, { data: newCvData }) {
      updateCvsCacheAfterCvUpdateProjectsMutation(cache, newCvData!, data!, projectsIds);
    },
  });

  useEffect(() => {
    if (data?.projects?.length) {
      setProjects(
        data.projects.reduce((acc, { name, id }) => {
          acc[id] = name;
          return acc;
        }, {} as Record<string, string>)
      );
    }
    if (error) {
      onClose();
    }
  }, [data, error, onClose]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setProjectsIds(event.target.value as string[]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCv({
      variables: {
        id: cvData?.cv.id,
        cv: {
          name: cvData?.cv.name,
          description: cvData?.cv.description,
          userId: cvData?.cv.user?.id,
          skills: createArrayForSkills(cvData?.cv?.skills),
          projectsIds: projectsIds,
          languages: createArrayForLanguages(cvData?.cv?.languages),
          is_template: cvData?.cv.is_template,
        },
      },
    })
      .catch((err) => console.error((err as TError).message))
      .finally(() => onClose());
  };

  return (
    <ModalWindow title={'Update Cv Projects'} onClose={onClose} open={open}>
      {loading || cvLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <Styled.FormWrapper>
            <Styled.FormControl>
              <InputLabel id="projects-label">Projects</InputLabel>
              <Select
                labelId="projects-label"
                id="projects-chip"
                multiple
                value={projectsIds}
                onChange={handleChange}
                input={<OutlinedInput label="Projects" />}
                renderValue={(selected) => (
                  <Styled.ChipWrapper>
                    {selected.map((value) => (
                      <Chip key={value} label={projects[value]} />
                    ))}
                  </Styled.ChipWrapper>
                )}
              >
                {Object.keys(projects).map((id) => (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={projectsIds.includes(id)} />
                    <ListItemText primary={projects[id]} />
                  </MenuItem>
                ))}
              </Select>
            </Styled.FormControl>
            <Styled.ButtonSubmit variant="contained" type="submit" loading={updateCvLoading}>
              Save
            </Styled.ButtonSubmit>
          </Styled.FormWrapper>
        </form>
      )}
    </ModalWindow>
  );
};
