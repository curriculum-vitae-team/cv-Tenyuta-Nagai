import { useQuery } from '@apollo/client';
import { USER } from '../../../../graphql/queries/user';
import { ILanguagesReturn } from '../../../../graphql/types/results/language';
import { IUserAllResult } from '../../../../graphql/types/results/user';
import { LanguageMastery } from '../constants/LanguageMastery';
import { LANGUAGES } from '../../../../graphql/queries/languages';

export const useEmployeeLanguagesFormData = (id: string) => {
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery<IUserAllResult>(
    USER,
    {
      variables: { id },
    }
  );
  const { loading: languagesLoading, error: languagesError, data: languagesData } = useQuery<
    ILanguagesReturn
  >(LANGUAGES);

  const languageProficiencyData = [
    { id: LanguageMastery.A1, name: LanguageMastery.A1 },
    { id: LanguageMastery.A2, name: LanguageMastery.A2 },
    { id: LanguageMastery.B1, name: LanguageMastery.B1 },
    { id: LanguageMastery.B2, name: LanguageMastery.B2 },
    { id: LanguageMastery.C1, name: LanguageMastery.C1 },
    { id: LanguageMastery.C2, name: LanguageMastery.C2 },
    { id: LanguageMastery.NATIVE, name: LanguageMastery.NATIVE },
  ];

  return {
    loading: loadingUser || languagesLoading,
    error: errorUser || languagesError,
    userData,
    languagesData,
    languageProficiencyData,
  };
};
