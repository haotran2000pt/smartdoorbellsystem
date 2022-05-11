import { BigIntType, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ hidden: true, onUpdate: () => new Date() })
  updatedAt = new Date();
}
