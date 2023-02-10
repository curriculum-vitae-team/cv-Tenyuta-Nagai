import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ILanguage } from '../../interfaces/ILanguage.interface';
import { CreateLanguageResult, ILanguagesReturn } from '../types/results/language';
import { LANGUAGES } from './../queries/languages';

export const updateCacheAfterCreatingLanguage = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: CreateLanguageResult
) => {
  const allLanguages = cache.readQuery<ILanguagesReturn>({ query: LANGUAGES });

  const newLanguage = {
    ...data?.createLanguage,
    created_at: new Date(),
  };

  if (allLanguages) {
    cache.writeQuery({
      query: LANGUAGES,
      data: {
        languages: [newLanguage, ...allLanguages.languages],
      },
    });
  }
};

export const updateCacheAfterDeleteLanguage = (cache: ApolloCache<ILanguage>, Id: string) => {
  const id = cache.identify({ id: Id, __typename: 'Language' });
  cache.evict({ id });
  cache.gc();
};
