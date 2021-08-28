import { Transform, TransformCallback } from 'stream';

class SquareTransformStream extends Transform {
  private invalidChunks: any[] = [];

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    try {
      const line = chunk.toString();
      const number = parseInt(line, 10);
      const doubleChunk = number ** 2;
      this.push(`${doubleChunk.toString()}\n`, 'utf-8');
    } catch (error) {
      this.invalidChunks.push(chunk);
    } finally {
      callback();
    }
  }

  _final(callback: TransformCallback) {
    if (this.invalidChunks.length === 0) {
      console.log('✅ All chunks are valid');
    } else {
      console.log(
        `⚠️ ${
          this.invalidChunks.length
        } invalid chunk(s). invalidChunks=${JSON.stringify(
          this.invalidChunks,
          null,
          2
        )}`
      );
    }

    callback();
  }
}

export default SquareTransformStream;
