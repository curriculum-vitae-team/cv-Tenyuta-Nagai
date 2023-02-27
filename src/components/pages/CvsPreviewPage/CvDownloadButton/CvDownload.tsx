import { BlobProvider } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { PrivateButton } from '../../../UI/PrivateButton';
import { CvPatternDownload } from '../CvPatternForDownload';
import { ICvPreviewProps } from '../CvsPreviewPage.interface';
import * as Styled from './CvDownload.styles';

export const CvDownloadLink = ({ data, isVisible }: ICvPreviewProps) => {
  const { t } = useTranslation();

  return (
    <PrivateButton isVisible={isVisible!} sx={{ mb: 5 }}>
      <BlobProvider document={<CvPatternDownload data={data} />}>
        {({ blob }) => {
          const downloadURL = URL.createObjectURL(new Blob([blob || ''], { type: 'text' }));
          return (
            blob && (
              <Styled.DownloadLink href={downloadURL} download="CV.pdf">
                {t('Download')}
              </Styled.DownloadLink>
            )
          );
        }}
      </BlobProvider>
    </PrivateButton>
  );
};
