import type { ITenantRepository } from "./tenant.repository.interface";
import { createTenantSchema, type CreateTenantInput } from "./tenant.schema";

export class CreateTenantService {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(data: CreateTenantInput) {
    const validatedData = createTenantSchema.parse(data);

    const existingTenant = await this.tenantRepository.findBySlug(
      validatedData.slug,
    );

    if (existingTenant) {
      throw new Error("Este slug já está em uso.");
    }

    return this.tenantRepository.create(validatedData);
  }
}
