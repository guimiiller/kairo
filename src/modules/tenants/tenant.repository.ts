import { Tenant } from "./tenant.model";
import type { CreateTenantInput } from "./tenant.schema";

export class TenantRepository {
  async findBySlug(slug: string) {
    return Tenant.findOne({ slug });
  }

  async create(data: CreateTenantInput) {
    return Tenant.create(data);
  }
}
