import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'Division' : ActorMethod<[bigint, bigint], string>,
  'Multiplicacion' : ActorMethod<[bigint, bigint], bigint>,
  'Resta' : ActorMethod<[bigint, bigint], bigint>,
  'Suma' : ActorMethod<[bigint, bigint], bigint>,
}
