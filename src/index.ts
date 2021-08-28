import fs from 'fs';
import { pipeline } from 'stream';
import split2 from 'split2';
import { join } from 'path';
import SquareTransformStream from './lib/square-transform-stream';
import { pipelineErrorCallback } from './lib/pipeline-helpers';
import { FileInputError, handleError } from './lib/error-helpers';

const main = (inputFilePath: string, outputFilePath: string) => {
  try {
    const absInputFilePath = join(__dirname, inputFilePath);

    if (!fs.existsSync(absInputFilePath)) {
      throw new FileInputError(`🚫 ${absInputFilePath} not found`);
    }

    const inputStream = fs.createReadStream(absInputFilePath);
    const squareTransformStream = new SquareTransformStream();
    const outputStream = fs.createWriteStream(join(__dirname, outputFilePath));

    pipeline(
      inputStream,
      split2(),
      squareTransformStream,
      outputStream,
      pipelineErrorCallback
    );
  } catch (error) {
    handleError(error, '🚫 Error transforming input file');
  }
};

const DATA_DIR = '../data';
main(`${DATA_DIR}/big-input.txt`, `${DATA_DIR}/output.txt`);