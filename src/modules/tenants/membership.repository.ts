import { Types } from "mongoose";
import { Membership } from "./membership.model";
import type { IMembershipRepository } from "./check-tenant-access.service";

export class MembershipRepository implements IMembershipRepository {
  async findActiveMembership(userId: Types.ObjectId, tenantId: Types.ObjectId) {
    return Membership.findOne({
      userId,
      tenantId,
      isActive: true,
    });
  }
}
