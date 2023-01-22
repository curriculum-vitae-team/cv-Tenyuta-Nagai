// export const toBase64 = (file: File) =>
//   new Promise((resolve, reject) => {
//     // const reader = new FileReader();
//     // reader.readAsDataURL(file);
//     // reader.onload = () => resolve(reader.result as string)?.replace('data:', '').replace(/^.+,/, ''););
//     // reader.onerror = (error) => reject(error);
//   });

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
