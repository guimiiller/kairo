import { describe, expect, it, vi } from "vitest";
import { Types } from "mongoose";

import {
  CheckTenantAccessService,
  type IMembershipRepository,
} from "./check-tenant-access.service";

describe("CheckTenantAccessService", () => {
  const userId = new Types.ObjectId();
  const tenantId = new Types.ObjectId();

  it("deve permitir acesso quando o usuário possui Membership ativa", async () => {
    const repository: IMembershipRepository = {
      findActiveMembership: vi.fn().mockResolvedValue({
        role: "admin",
      }),
    };

    const service = new CheckTenantAccessService(repository);

    const result = await service.execute(userId, tenantId);

    expect(result.role).toBe("admin");

    expect(repository.findActiveMembership).toHaveBeenCalledWith(
      userId,
      tenantId,
    );
  });

  it("deve negar acesso quando o usuário não possui Membership ativa", async () => {
    const repository: IMembershipRepository = {
      findActiveMembership: vi.fn().mockResolvedValue(null),
    };

    const service = new CheckTenantAccessService(repository);

    await expect(service.execute(userId, tenantId)).rejects.toThrow(
      "Acesso negado ao estabelecimento.",
    );
  });
});
