export const pipelineErrorCallback = (error: any) => {
  if (error) {
    console.log('🚫 Pipeline error.', error);
  } else {
    console.log('🚀 Pipeline success!');
  }
};
