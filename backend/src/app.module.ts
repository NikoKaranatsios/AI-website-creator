import { Module } from '@nestjs/common';
import { TensorflowService } from './tensorflow/tensorflow.service';
import { TensorflowController } from './tensorflow/tensorflow.controller';
import { TensorflowModule } from './tensorflow/tensorflow.module';

@Module({
  imports: [TensorflowModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
