import { describe, expect, it } from "vitest";
import { createTenantSchema } from "./tenant.schema";

describe("Tenant - Validação de cadastro", () => {
  it("deve aceitar um estabelecimento válido", () => {
    const tenant = {
      name: "Barbearia Alfa",
      slug: "barbearia-alfa",
      businessType: "barbershop",
    };

    const result = createTenantSchema.safeParse(tenant);

    expect(result.success).toBe(true);
  });

  it("deve rejeitar um estabelecimento com nome muito curto", () => {
    const tenant = {
      name: "AB",
      slug: "barbearia-alfa",
      businessType: "barbershop",
    };

    const result = createTenantSchema.safeParse(tenant);

    expect(result.success).toBe(false);
  });

  it("deve rejeitar um slug com espaços", () => {
    const tenant = {
      name: "Barbearia Alfa",
      slug: "barbearia alfa",
      businessType: "barbershop",
    };

    const result = createTenantSchema.safeParse(tenant);

    expect(result.success).toBe(false);
  });
});
