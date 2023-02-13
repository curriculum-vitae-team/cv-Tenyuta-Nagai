import { makeVar } from '@apollo/client';
import { IBreadcrumbs } from './breadcrumbsService.types';

class Breadcrumbs implements IBreadcrumbs {
  idPathName$ = makeVar('...');

  setIdPathName(value: string) {
    this.idPathName$(value);
  }
}

export const breadcrumbsService = new Breadcrumbs();
