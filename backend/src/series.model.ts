import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Series {
  @Field()
  id: string;

  @Field()
  name: string;
}
