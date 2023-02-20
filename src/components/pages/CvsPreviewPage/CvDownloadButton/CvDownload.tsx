import { BlobProvider } from '@react-pdf/renderer';
import { PrivateButton } from '../../../UI/PrivateButton';
import { CvPatternDownload } from '../CvPatternForDownload';
import { ICvDownloadProps } from './CvDownload.interface';
import * as Styled from './CvDownload.styles';

export const CvDownloadLink = ({ data, isVisible }: ICvDownloadProps) => {
  return (
    <PrivateButton isVisible={isVisible} sx={{ mb: 5 }}>
      <BlobProvider document={<CvPatternDownload data={data} />}>
        {({ blob }) => {
          const downloadURL = URL.createObjectURL(new Blob([blob || ''], { type: 'text' }));
          return (
            blob && (
              <Styled.DownloadLink href={downloadURL} download="CV.pdf">
                Download
              </Styled.DownloadLink>
            )
          );
        }}
      </BlobProvider>
    </PrivateButton>
  );
};
