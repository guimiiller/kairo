import { describe, expect, it, vi } from "vitest";
import { CreateTenantService } from "./create-tenant.service";
import type { ITenantRepository } from "./tenant.repository.interface";

describe("CreateTenantService", () => {
  it("deve criar um estabelecimento quando o slug estiver disponível", async () => {
    const tenantData = {
      name: "Barbearia Alfa",
      slug: "barbearia-alfa",
      businessType: "barbershop" as const,
    };

    const repository: ITenantRepository = {
      findBySlug: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        ...tenantData,
        id: "tenant-123",
      }),
    };

    const service = new CreateTenantService(repository);

    const result = await service.execute(tenantData);

    expect(repository.findBySlug).toHaveBeenCalledWith("barbearia-alfa");

    expect(repository.create).toHaveBeenCalledWith(tenantData);

    expect(result).toEqual({
      ...tenantData,
      id: "tenant-123",
    });
  });

  it("não deve criar um estabelecimento quando o slug já existir", async () => {
    const tenantData = {
      name: "Barbearia Alfa",
      slug: "barbearia-alfa",
      businessType: "barbershop" as const,
    };

    const repository: ITenantRepository = {
      findBySlug: vi.fn().mockResolvedValue({
        id: "tenant-existente",
      }),
      create: vi.fn(),
    };

    const service = new CreateTenantService(repository);

    await expect(service.execute(tenantData)).rejects.toThrow(
      "Este slug já está em uso.",
    );

    expect(repository.create).not.toHaveBeenCalled();
  });
});
