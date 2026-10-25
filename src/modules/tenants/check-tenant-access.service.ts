import type { Types } from "mongoose";

export interface IMembershipRepository {
  findActiveMembership(
    userId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<{
    role: "owner" | "admin" | "professional";
  } | null>;
}

export class CheckTenantAccessService {
  constructor(private readonly membershipRepository: IMembershipRepository) {}

  async execute(userId: Types.ObjectId, tenantId: Types.ObjectId) {
    const membership = await this.membershipRepository.findActiveMembership(
      userId,
      tenantId,
    );

    if (!membership) {
      throw new Error("Acesso negado ao estabelecimento.");
    }

    return membership;
  }
}
