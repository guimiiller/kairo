import type { CreateTenantInput } from "./tenant.schema";

export interface ITenantRepository {
  findBySlug(slug: string): Promise<unknown | null>;

  create(data: CreateTenantInput): Promise<unknown>;
}
