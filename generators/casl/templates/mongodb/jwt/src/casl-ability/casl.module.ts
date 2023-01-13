import { Module } from '@nestjs/common';
import CaslAbilityFactory from './casl-ability.factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export default class CaslModule {}
